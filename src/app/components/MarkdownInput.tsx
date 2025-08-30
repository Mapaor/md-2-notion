'use client';

import React, { useState, useMemo, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css';
import { markdownToBlocks } from '../lib/utils/markdownToNotion';

interface MarkdownInputProps {
  initialValue?: string;
  onMarkdownChange?: (markdown: string, notionJson: string) => void;
}

// Simple Error Boundary for markdown preview
class MarkdownErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode; content?: string },
  { hasError: boolean; lastContent: string; errorCount: number }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode; content?: string }) {
    super(props);
    this.state = { hasError: false, lastContent: '', errorCount: 0 };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    console.warn('Markdown preview error caught by boundary:', error.message);
    // If it's the known remarkGfm error, we know the fallback will work
    if (error.message.includes('inTable') || error.message.includes('this.data is undefined')) {
      console.info('Known remarkGfm error detected, falling back to basic markdown');
    }
  }

  componentDidUpdate(prevProps: { content?: string }): void {
    // Reset error state when content actually changes
    if (this.props.content !== prevProps.content && this.props.content !== this.state.lastContent) {
      if (this.state.hasError) {
        // Reset immediately when content changes for remarkGfm errors
        setTimeout(() => {
          this.setState({ 
            hasError: false, 
            lastContent: this.props.content || '',
            errorCount: this.state.errorCount + 1
          });
        }, 100); // Very fast reset for better UX
      } else {
        this.setState({ lastContent: this.props.content || '' });
      }
    }
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

const MarkdownInput: React.FC<MarkdownInputProps> = ({ initialValue = '', onMarkdownChange }) => {
  const [text, setText] = useState<string>(initialValue);
  const [error, setError] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [copyJsonSuccess, setCopyJsonSuccess] = useState<boolean>(false);
  const [debouncedText, setDebouncedText] = useState<string>(initialValue);
  const [previewText, setPreviewText] = useState<string>(initialValue);

  // Debounce text changes to avoid excessive processing while typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(text);
    }, 300); // 300ms delay for JSON

    return () => clearTimeout(timer);
  }, [text]);

  // Longer debounce for preview to avoid parsing errors while typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreviewText(text);
    }, 1200); // 1200ms delay for preview to allow complete typing

    return () => clearTimeout(timer);
  }, [text]);

  // Create a safe ReactMarkdown component that handles plugin errors
  const SafeMarkdownPreview = ({ content }: { content: string }) => {
    // Don't render anything if content is empty
    if (!content.trim()) {
      return (
        <div className="text-gray-400 text-sm italic">
          Escriu algun text en markdown per veure la previsualització...
        </div>
      );
    }

    const fallbackPreview = (
      <div className="text-gray-600 text-sm">
        <p>⚠️ Previsualització temporalment no disponible</p>
        <pre className="text-xs mt-2 bg-gray-50 p-2 rounded max-h-32 overflow-y-auto font-mono">
          {content.length > 300 ? content.substring(0, 300) + '...' : content}
        </pre>
      </div>
    );

    // Check for patterns that cause remarkGfm to fail
    const hasInlineCode = content.includes('`');

    // If there's any inline code, skip remarkGfm to avoid errors
    if (hasInlineCode) {
      return (
        <MarkdownErrorBoundary content={content} fallback={fallbackPreview}>
          <ReactMarkdown 
            remarkPlugins={[remarkMath]}
            // @ts-expect-error - Version compatibility issues
            rehypePlugins={[rehypeKatex, rehypeHighlight]}
          >
            {content}
          </ReactMarkdown>
        </MarkdownErrorBoundary>
      );
    }

    // First try: with all plugins including GFM
    return (
      <MarkdownErrorBoundary content={content} fallback={
        // Second try: without GFM if the first fails
        <MarkdownErrorBoundary content={content} fallback={fallbackPreview}>
          <ReactMarkdown 
            remarkPlugins={[remarkMath]}
            // @ts-expect-error - Version compatibility issues
            rehypePlugins={[rehypeKatex, rehypeHighlight]}
          >
            {content}
          </ReactMarkdown>
        </MarkdownErrorBoundary>
      }>
        <ReactMarkdown 
          remarkPlugins={[remarkGfm, remarkMath]}
          // @ts-expect-error - Version compatibility issues with unified ecosystem
          rehypePlugins={[rehypeKatex, rehypeHighlight]}
        >
          {content}
        </ReactMarkdown>
      </MarkdownErrorBoundary>
    );
  };

  const notionJson = useMemo(() => {
    // Don't process if text is empty
    if (!debouncedText.trim()) {
      return JSON.stringify([], null, 2);
    }

    try {
      const blocks = markdownToBlocks(debouncedText);
      return JSON.stringify(blocks, null, 2);
    } catch (error) {
      console.warn('Error generant JSON de Notion en temps real:', error);
      // Return a safe fallback instead of throwing
      return JSON.stringify([{
        type: 'paragraph',
        paragraph: {
          rich_text: [{
            type: 'text',
            text: { content: 'Error en la conversió en temps real', link: null },
            annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'red' },
            plain_text: 'Error en la conversió en temps real',
            href: null
          }],
          color: 'default'
        }
      }], null, 2);
    }
  }, [debouncedText]);

  // Use useEffect to call the callback when markdown or JSON changes
  useEffect(() => {
    if (onMarkdownChange) {
      onMarkdownChange(text, notionJson);
    }
  }, [text, notionJson, onMarkdownChange]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.name.endsWith('.md')) {
      setError("Només es permeten fitxers '.md'.");
      return;
    }

    setError('');

    try {
      const content = await file.text();
      setText(content);
    } catch (err: unknown) {
      console.error('Error en llegir fitxer:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error desconegut';
      setError(`Error en llegir fitxer: ${errorMessage}`);
    }
  };

  const handleCopyText = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('No s\'ha pogut copiar el text:', err);
      setError("No s'ha pogut copiar el text");
    }
  };

  const handleCopyJson = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(notionJson);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = notionJson;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopyJsonSuccess(true);
      setTimeout(() => setCopyJsonSuccess(false), 2000);
    } catch (err) {
      console.error('No s\'ha pogut copiar el JSON:', err);
      setError("No s'ha pogut copiar el JSON");
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      {/* Importar fitxer */}
      <h2 className="text-lg font-semibold">Importa des d&apos;un fitxer</h2>
      <div>
        <input
          type="file"
          accept=".md,text/markdown"
          onChange={handleFileChange}
          className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-gray-700 cursor-pointer transition hover:border-gray-400 hover:bg-gray-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
        {error && <p className="mt-2 text-red-600 font-medium">{error}</p>}
      </div>

      {/* Input de text */}
      <h2 className="text-lg font-semibold">Markdown Input</h2>
      <div className="relative bg-slate-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className={`absolute top-3 right-16 bg-emerald-500 text-white px-3 py-1 rounded-md text-xs font-medium transition-opacity duration-300 pointer-events-none ${copySuccess ? 'opacity-100' : 'opacity-0'}`}>Copiat!</div>
        <button
          onClick={handleCopyText}
          className="absolute top-3 right-3 bg-white border border-gray-300 rounded-md p-2 text-gray-500 cursor-pointer transition hover:text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm z-10"
          aria-label="Copiar text"
          title="Copiar text"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        </button>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-64 p-4 text-sm leading-6 text-gray-800 font-mono resize-y focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {/* Preview renderitzat */}
      <h2 className="text-lg font-semibold">Previsualització</h2>
      <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm h-64 overflow-y-auto">
        <div className="markdown-preview">
          <SafeMarkdownPreview content={previewText} />
        </div>
      </div>

      {/* JSON de Notion */}
      <h2 className="text-lg font-semibold">Notion JSON</h2>
      <div className="relative p-4 bg-slate-50 border border-gray-200 rounded-xl shadow-sm h-64 overflow-y-auto">
        <div className={`absolute top-3 right-16 bg-emerald-500 text-white px-3 py-1 rounded-md text-xs font-medium transition-opacity duration-300 pointer-events-none ${copyJsonSuccess ? 'opacity-100' : 'opacity-0'}`}>Copiat!</div>
        <div className="absolute top-3 right-3 z-20">
          <button
            onClick={handleCopyJson}
            className="bg-white border border-gray-300 rounded-md p-2 text-gray-500 cursor-pointer transition hover:text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm"
            aria-label="Copiar JSON"
            title="Copiar JSON"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>
        </div>
        <pre className="text-xs text-gray-800 font-mono whitespace-pre-wrap mt-8">{notionJson}</pre>
      </div>
    </div>
  );
};

export default MarkdownInput;

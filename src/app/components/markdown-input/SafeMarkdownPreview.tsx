import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { MarkdownErrorBoundary } from './MarkdownErrorBoundary';

interface SafeMarkdownPreviewProps {
  content: string;
}

export const SafeMarkdownPreview: React.FC<SafeMarkdownPreviewProps> = ({ content }) => {
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

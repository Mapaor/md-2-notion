'use client';

import React from 'react';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css';
import { useMarkdownInput } from '../../hooks/useMarkdownInput';
import { FileUpload } from './FileUpload';
import { MarkdownTextArea } from './MarkdownTextArea';
import { MarkdownPreview } from './MarkdownPreview';
import { NotionJsonDisplay } from './NotionJsonDisplay';

interface MarkdownInputProps {
  initialValue?: string;
  onMarkdownChange?: (markdown: string, notionJson: string) => void;
}

const MarkdownInput: React.FC<MarkdownInputProps> = ({ 
  initialValue = '', 
  onMarkdownChange 
}) => {
  const {
    text,
    setText,
    error,
    previewText,
    notionJson,
    copyTextSuccess,
    copyJsonSuccess,
    handleFileChange,
    handleCopyText,
    handleCopyJson,
  } = useMarkdownInput({ initialValue, onMarkdownChange });

  return (
    <div className="mt-4 mx-auto space-y-6">
      <FileUpload 
        onFileChange={handleFileChange}
        error={error}
      />

      <MarkdownTextArea
        value={text}
        onChange={setText}
        onCopy={handleCopyText}
        showCopySuccess={copyTextSuccess}
      />

      <MarkdownPreview content={previewText} />

      <NotionJsonDisplay
        json={notionJson}
        onCopy={handleCopyJson}
        showCopySuccess={copyJsonSuccess}
      />
    </div>
  );
};

export default MarkdownInput;

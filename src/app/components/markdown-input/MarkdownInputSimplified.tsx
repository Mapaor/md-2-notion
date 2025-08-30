'use client';

import React from 'react';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css';
import { useMarkdownInput } from '../../hooks/useMarkdownInput';
import { FileUpload } from './FileUpload';
import { MarkdownTextArea } from './MarkdownTextArea';

interface MarkdownInputProps {
  initialValue?: string;
  onMarkdownChange?: (markdown: string, notionJson: string) => void;
}

const MarkdownInputSimplified: React.FC<MarkdownInputProps> = ({ 
  initialValue = '', 
  onMarkdownChange 
}) => {
  const {
    text,
    setText,
    error,
    copyTextSuccess,
    handleFileChange,
    handleCopyText,
  } = useMarkdownInput({ initialValue, onMarkdownChange });

  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default MarkdownInputSimplified;

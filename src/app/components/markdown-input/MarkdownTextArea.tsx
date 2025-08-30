import React from 'react';
import { CopyButton } from './CopyButton';

interface MarkdownTextAreaProps {
  value: string;
  onChange: (value: string) => void;
  onCopy: () => void;
  showCopySuccess: boolean;
}

export const MarkdownTextArea: React.FC<MarkdownTextAreaProps> = ({ 
  value, 
  onChange, 
  onCopy, 
  showCopySuccess 
}) => {
  return (
    <div className="relative bg-slate-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <CopyButton
        onClick={onCopy}
        showSuccess={showCopySuccess}
        ariaLabel="Copiar text"
        title="Copiar text"
      />
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Escriu el teu markdown aquí..."
        className="w-full h-64 p-4 text-sm leading-6 text-gray-800 font-mono resize-y focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
};

import React from 'react';
import { SafeMarkdownPreview } from './SafeMarkdownPreview';

interface MarkdownPreviewProps {
  content: string;
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3 text-slate-600">Previsualització</h2>
      <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm h-64 overflow-y-auto">
        <div className="markdown-preview">
          <SafeMarkdownPreview content={content} />
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { CopyButton } from './CopyButton';

interface NotionJsonDisplayProps {
  json: string;
  onCopy: () => void;
  showCopySuccess: boolean;
}

export const NotionJsonDisplay: React.FC<NotionJsonDisplayProps> = ({ 
  json, 
  onCopy, 
  showCopySuccess 
}) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3 text-slate-600">Notion JSON</h2>
      <div className="relative p-4 bg-slate-50 border border-gray-200 rounded-xl shadow-sm h-64 overflow-y-auto">
        <div className="absolute top-3 right-3 z-20">
          <CopyButton
            onClick={onCopy}
            showSuccess={showCopySuccess}
            ariaLabel="Copiar JSON"
            title="Copiar JSON"
          />
        </div>
        <pre className="text-xs text-gray-800 font-mono whitespace-pre-wrap mt-8">{json}</pre>
      </div>
    </div>
  );
};

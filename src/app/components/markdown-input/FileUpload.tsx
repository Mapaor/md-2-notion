import React, { useState } from 'react';

interface FileUploadProps {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileChange, error }) => {
  const [selectedFile, setSelectedFile] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file ? file.name : '');
    onFileChange(event);
  };

  return (
    <div>
      <label className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-gray-700 cursor-pointer transition hover:border-gray-400 hover:bg-gray-100 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 flex items-center justify-center">
        <input
          type="file"
          accept=".md,text/markdown"
          onChange={handleFileChange}
          className="sr-only"
        />
        <span className="text-sm flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {selectedFile ? `${selectedFile}` : (
            <>Puja-hi un fitxer <code className="pt-1 px-1 bg-amber-200 rounded">.md</code></>
          )}
        </span>
      </label>
      {error && <p className="mt-2 text-red-600 font-medium">{error}</p>}
    </div>
  );
};

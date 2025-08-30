import React, { useState, useRef } from 'react';

interface FileUploadProps {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileChange, error }) => {
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file ? file.name : '');
    onFileChange(event);
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragActive(false);
    const file = event.dataTransfer.files?.[0];
    if (file && inputRef.current) {
      // Assign file to input for consistency
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      inputRef.current.files = dataTransfer.files;
      // Trigger change event manually
      const changeEvent = new Event('change', { bubbles: true });
      inputRef.current.dispatchEvent(changeEvent);
    }
  };

  return (
    <div>
      <label
        className={`w-full p-3 border-2 border-dashed rounded-lg bg-gray-50 text-gray-700 cursor-pointer transition flex items-center justify-center
          ${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-100 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200'}`}
        onDragOver={e => { e.preventDefault(); setIsDragActive(true); }}
        onDragLeave={() => setIsDragActive(false)}
        onDrop={handleDrop}
        tabIndex={0}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".md,text/markdown"
          onChange={handleFileChange}
          className="sr-only"
        />
        <span className="text-sm flex items-center gap-2">
          {/* Icona fitxer */}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {selectedFile
            ? selectedFile
            : (
              <>
                Puja-hi un fitxer <code className="pt-1 px-1 bg-amber-200 rounded">.md</code>
              </>
            )
          }
        </span>
      </label>
      {error && <p className="mt-2 text-red-600 font-medium">{error}</p>}
    </div>
  );
};
import React from 'react';

interface CopyButtonProps {
  onClick: () => void;
  showSuccess: boolean;
  ariaLabel: string;
  title: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ onClick, showSuccess, ariaLabel, title }) => {
  return (
    <>
      <div className={`absolute top-3 right-16 bg-emerald-500 text-white px-3 py-1 rounded-md text-xs font-medium transition-opacity duration-300 pointer-events-none ${showSuccess ? 'opacity-100' : 'opacity-0'}`}>
        Copiat!
      </div>
      <button
        onClick={onClick}
        className="absolute top-3 right-3 bg-white border border-gray-300 rounded-md p-2 text-gray-500 cursor-pointer transition hover:text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm z-10"
        aria-label={ariaLabel}
        title={title}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      </button>
    </>
  );
};

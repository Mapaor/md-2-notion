'use client';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import MarkdownInputSimplified from '../components/markdown-input/MarkdownInputSimplified';
import importarMarkdown from '../lib/utils/importarMarkdown';


export default function SimpleTeXButton() {
  const [error, setError] = useState<string | null>(null);
  const [msgOutput, setOutput] = useState<string | null>(null);
  const [currentNotionJson, setCurrentNotionJson] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Hardcoded values
  const notionToken = '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';
  const pageId = '25e72e8225e1807db1cbd8c2e44f6a30';

  const handleMarkdownChange = useCallback((markdown: string, notionJson: string) => {
    setCurrentNotionJson(notionJson);
  }, []);

  const importarMarkdownHandler = async () => {
    if (!currentNotionJson.trim()) {
      setError('No hi ha contingut Markdown per importar');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setOutput(null);
      await importarMarkdown(pageId, notionToken, currentNotionJson, setError);
      setOutput('Markdown importat correctament a Notion!');
    } catch (err: unknown) {
      let errorMsg = 'Error desconegut';
      if (err instanceof Error) errorMsg = err.message;
      console.error('Error inesperat:', errorMsg);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 font-sans text-gray-800">
      {/* <h1 className="text-2xl font-bold text-center text-green-600 mb-8">Importar Markdown</h1> */}
      
      <MarkdownInputSimplified 
        onMarkdownChange={handleMarkdownChange}
      />

      <button 
        className={`text-white py-3 px-5 rounded-lg font-medium shadow w-full transition flex items-center justify-center mt-6 ${
          !currentNotionJson.trim() || isLoading
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-green-600 hover:bg-green-500'
        }`}
        onClick={importarMarkdownHandler}
        disabled={!currentNotionJson.trim() || isLoading}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Important...
          </>
        ) : (
          'Importar a Notion'
        )}
      </button>

      {/* Output simple */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {msgOutput && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-sm">{msgOutput}</p>
        </div>
      )}

      {/* Enllaç de tornada simple */}
      {/* <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-gray-500 hover:text-green-600 text-sm"
        >
          ← Pàgina principal
        </Link>
      </div> */}
    </div>
  );
}

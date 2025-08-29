'use client';
import { useState } from 'react';
import importarMarkdown from '../lib/utils/importarMarkdown';
import type { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';


export default function SimpleTeXButton() {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<BlockObjectResponse[] | null>(null);

  // Hardcoded values
  const notionToken = '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';
  const pageId = '25e72e8225e1807db1cbd8c2e44f6a30';

  const importarMarkdownHandler = async () => {
    const markdownJSON = `
    {
    "type": "paragraph",
    "paragraph": {
        "rich_text": [{
        "type": "text",
        "text": {
            "content": "This is a paragraph!",
            "link": null
        }
        }],
        "color": "default"
    }
    `
    try {
      setError(null);
      setData(null);
      const result = await importarMarkdown(pageId, notionToken, markdownJSON, setError);
      setData(result);
    } catch (err: unknown) {
      let errorMsg = 'Error desconegut';
      if (err instanceof Error) errorMsg = err.message;
      console.error('Error inesperat:', errorMsg);
      setError(errorMsg);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 font-sans text-gray-800">
      <button className="bg-green-600 text-white py-3 px-5 rounded-lg font-medium shadow hover:bg-green-500 w-full transition mb-6" onClick={importarMarkdownHandler}>
        Importar Markdown
      </button>
      <div>
        {error && (
          <>
            <h3 className="font-bold text-red-600 mb-2">Error</h3>
            <pre className="bg-red-100 p-3 rounded text-sm font-mono whitespace-pre-wrap mb-4">{error}</pre>
          </>
        )}
      </div>
    </div>
  );
}

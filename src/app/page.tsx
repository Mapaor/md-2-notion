'use client';
import { useState, useCallback } from 'react';
import importarMarkdown from './lib/utils/importarMarkdown';
import { markdownToAST } from './lib/utils/Markdown2AST';
import Head from 'next/head';
import MarkdownInput from './components/markdown-input/MarkdownInput';
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';



export default function Home() {
  const [pageId, setPageId] = useState('');
  const [notionToken, setNotionToken] = useState('');
  const [data, setData] = useState<BlockObjectResponse[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [msgOutput, setOutput] = useState<string | null>(null);
  const [currentMarkdown, setCurrentMarkdown] = useState('');
  const [currentNotionJson, setCurrentNotionJson] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    errors?: string[];
    warnings?: string[];
    statistics?: {
      totalNodes: number;
      nodeTypes: Record<string, number>;
      hasEquations: boolean;
      hasImages: boolean;
      hasTables: boolean;
      hasCodeBlocks: boolean;
    };
  } | null>(null);

  const handleMarkdownChange = useCallback((markdown: string, notionJson: string) => {
    setCurrentMarkdown(markdown);
    setCurrentNotionJson(notionJson);
    // Clear verification result when markdown changes
    setVerificationResult(null);
  }, []);

  // const verificarMarkdownHandler = async () => {
  //   if (!currentMarkdown.trim()) {
  //     setError('No hi ha contingut Markdown per verificar');
  //     return;
  //   }

  //   try {
  //     setIsVerifying(true);
  //     setError(null);
  //     setVerificationResult(null);
      
  //     const result = markdownToAST(currentMarkdown);
      
  //     if (result.success) {
  //       setVerificationResult({
  //         success: true,
  //         warnings: result.warnings,
  //         statistics: result.statistics
  //       });
  //       setOutput('✅ Markdown verificat correctament!');
  //     } else {
  //       setVerificationResult({
  //         success: false,
  //         errors: result.errors,
  //         warnings: result.warnings,
  //         statistics: result.statistics
  //       });
  //       setError('❌ S\'han trobat errors en el Markdown');
  //     }
  //   } catch (err: unknown) {
  //     let errorMsg = 'Error desconegut durant la verificació';
  //     if (err instanceof Error) errorMsg = err.message;
  //     console.error('Error inesperat:', errorMsg);
  //     setError(errorMsg);
  //     setVerificationResult({
  //       success: false,
  //       errors: [errorMsg]
  //     });
  //   } finally {
  //     setIsVerifying(false);
  //   }
  // };

  const importarMarkdownHandler = async () => {
    if (!currentNotionJson.trim()) {
      setError('No hi ha contingut Markdown per importar');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setData(null);
      setOutput(null);
      const result = await importarMarkdown(pageId, notionToken, currentNotionJson, setError);
      setData(result);
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
    <div className="max-w-xl mx-auto p-8 font-sans text-gray-800">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        />
      </Head>
      <h1 className="text-3xl font-bold text-center text-green-600 mb-2">Importar Markdown a una pàgina de Notion</h1>
      <h3 className="mt-6 text-lg text-gray-600 font-semibold">NOTION_TOKEN</h3>
      <input
        className="w-full p-3 mt-2 border border-gray-300 rounded-md text-base"
        type="text"
        placeholder="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"
        value={notionToken}
        onChange={(e) => setNotionToken(e.target.value)}
      />
      <h3 className="mt-6 text-lg text-gray-600 font-semibold">Page ID</h3>
      <input
        className="w-full p-3 mt-2 border border-gray-300 rounded-md text-base"
        type="text"
        placeholder="25e72e8225e1807db1cbd8c2e44f6a30"
        value={pageId}
        onChange={(e) => setPageId(e.target.value)}
      />
      <h3 className="mt-6 text-lg text-gray-600 font-semibold">Introdueix l&apos;input</h3>
      <MarkdownInput 
        onMarkdownChange={handleMarkdownChange}
        initialValue={`# Exemples de Markdown

## Text amb estils

Aquest és un **text en negreta** i aquest és *text en cursiva*.

## Llistes

1. Element 1
2. Element 2
3. Element 3

- Element A
- Element B
- Element C

- [X] Tasca A
- [ ] Tasca B

### Codi

Podem tenir blocs de \`codi\` en javascript, python i molts més llenguatges.

\`\`\`javascript
console.log('Hola, món!');
\`\`\`

### Cita

> Aquesta és una cita.

### Taula

| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

### Equacions

La famosa identitat d'Euler $e^{i\\pi}+1=0$ és en realitat un cas particular de l'equació d'Euler per $x=\\pi$

$$
e^{i\\pi }=\\cos \\pi +i\\sin \\pi
$$

### Imatges

![](https://cdn.mathpix.com/cropped/2025_08_29_1fa009b3b17812752d01g-01.jpg?height=238&width=423&top_left_y=1695&top_left_x=1304)

### Enllaç

[Enllaç a GitHub](https://github.com)

[Enllaç relatiu](../../Resum-teoria-Compu.md)`}></MarkdownInput>
      <h3 className="mt-6 text-lg text-gray-600 font-semibold">Executa l&apos;acció</h3>
      {/* {currentMarkdown && (
        <div className="mt-2 p-2 bg-gray-50 border rounded text-sm">
          <strong>Markdown detectat:</strong> {currentMarkdown.length} caràcters
        </div>
      )} */}
      
      {/* Botó de Verificar Markdown */}
      {/* <button 
        className={`mt-6 text-white py-3 px-5 rounded-lg font-medium shadow w-full transition flex items-center justify-center ${
          !currentMarkdown.trim() || isVerifying
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-500'
        }`}
        onClick={verificarMarkdownHandler}
        disabled={!currentMarkdown.trim() || isVerifying}
      >
        {isVerifying ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Verificant...
          </>
        ) : (
          '🔍 Verificar Markdown'
        )}
      </button> */}

      {/* Resultats de la verificació */}
      {/* {verificationResult && (
        <div className={`mt-4 p-4 rounded-lg border ${
          verificationResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
        }`}>
          <h4 className={`font-semibold ${
            verificationResult.success ? 'text-green-800' : 'text-red-800'
          }`}>
            {verificationResult.success ? '✅ Verificació correcta' : '❌ Errors trobats'}
          </h4>
          
          {verificationResult.errors && verificationResult.errors.length > 0 && (
            <div className="mt-2">
              <p className="text-red-700 font-medium">Errors:</p>
              <ul className="text-red-600 text-sm mt-1">
                {verificationResult.errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}
          
          {verificationResult.warnings && verificationResult.warnings.length > 0 && (
            <div className="mt-2">
              <p className="text-orange-700 font-medium">Avisos:</p>
              <ul className="text-orange-600 text-sm mt-1">
                {verificationResult.warnings.map((warning, index) => (
                  <li key={index}>• {warning}</li>
                ))}
              </ul>
            </div>
          )}
          
          {verificationResult.statistics && (
            <div className="mt-3">
              <p className="text-gray-700 font-medium">Estadístiques:</p>
              <div className="text-sm text-gray-600 mt-1 grid grid-cols-2 gap-2">
                <div>📊 Total nodes: {verificationResult.statistics.totalNodes}</div>
                <div>🧮 Equacions: {verificationResult.statistics.hasEquations ? '✅' : '❌'}</div>
                <div>🖼️ Imatges: {verificationResult.statistics.hasImages ? '✅' : '❌'}</div>
                <div>📋 Taules: {verificationResult.statistics.hasTables ? '✅' : '❌'}</div>
                <div>💻 Codi: {verificationResult.statistics.hasCodeBlocks ? '✅' : '❌'}</div>
              </div>
              {Object.keys(verificationResult.statistics.nodeTypes).length > 0 && (
                <div className="mt-2">
                  <p className="text-gray-600 text-xs">Tipus de nodes:</p>
                  <div className="text-xs text-gray-500 flex flex-wrap gap-1 mt-1">
                    {Object.entries(verificationResult.statistics.nodeTypes).map(([type, count]) => (
                      <span key={type} className="bg-gray-100 px-2 py-1 rounded">
                        {type}: {count}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )} */}

      {/* Botó d'Importar Markdown */}
      <button 
        className={`mt-4 text-white py-3 px-5 rounded-lg font-medium shadow w-full transition flex items-center justify-center ${
          !currentNotionJson.trim() || !pageId || !notionToken || isLoading
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-green-600 hover:bg-green-500'
        }`}
        onClick={importarMarkdownHandler}
        disabled={!currentNotionJson.trim() || !pageId || !notionToken || isLoading}
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
          'Importar Markdown'
        )}
      </button>
      <h3 className="mt-6 text-lg text-gray-600 font-semibold">Output</h3>
      <div className="mt-2">
      {error && (
        <>
          <p className="mt-10 font-bold text-gray-800">Error</p>
          <pre className="text-red-600 mt-2 whitespace-pre-wrap">{error}</pre>
        </>
      )}
      {msgOutput && (
        <>
          <p className="mt-10 font-bold text-gray-800">Missatge Output</p>
          <pre className="mt-2 bg-green-100 p-3 rounded text-sm font-mono whitespace-pre-wrap text-green-800">{msgOutput}</pre>
        </>
      )}
      {data && (
        <>
          <p className="mt-6 font-bold text-gray-800">Blocs afegits ({data.length})</p>
          <pre className="mt-2 bg-gray-100 p-3 rounded text-xs font-mono whitespace-pre-wrap max-h-64 overflow-y-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </>
      )}

      </div>
      <hr className="my-8 border-t border-gray-200" />
      <h1 className="text-2xl font-bold text-center text-green-600 mt-10">Exemple</h1>
      <h3 className="mt-6 text-lg text-gray-600 font-semibold">Pàgina de Notion d&apos;exemple</h3>
      <a
        href="https://silky-gastonia-a58.notion.site/Importar-Markdown-25e72e8225e1807db1cbd8c2e44f6a30?source=copy_link"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center bg-blue-600 rounded-lg px-4 py-3 my-4 shadow text-white font-medium hover:bg-blue-400 transition"
      >
        Importar Markdown a Notion
      </a>
      <p className="text-gray-400">
        Utilitza el NOTION_TOKEN i el Page ID que apareixen als placeholders, o entra a {' '}
        <a
          href="./botoImportarMarkdown"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-gray-400 hover:text-gray-600"
        >
          aquí
        </a> per fer servir la pàgina d&apos;exemple
        .
      </p>
      <div className="flex justify-center mt-12">
        <a
          href="https://github.com/Mapaor/md-2-notion"
          target="_blank"
          rel="noopener noreferrer"
          title="Veure el repositori de GitHub"
          className="text-gray-700 text-4xl hover:text-green-600 transition"
        >
          <i className="fab fa-github"></i>
        </a>
      </div>
    </div>
  );
}
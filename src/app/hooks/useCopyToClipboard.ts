import { useState } from 'react';

export const useCopyToClipboard = () => {
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback per a navegadors antics
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('No s\'ha pogut copiar el text:', err);
      throw new Error("No s'ha pogut copiar el text");
    }
  };

  return { copySuccess, copyToClipboard };
};

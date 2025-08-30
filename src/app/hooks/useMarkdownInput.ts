import { useState, useEffect, useMemo } from 'react';
import { useDebounce } from './useDebounce';
import { useCopyToClipboard } from './useCopyToClipboard';
import { readMarkdownFile } from '../lib/helpers/fileUtils';
import { generateNotionJson } from '../lib/helpers/notionUtils';

interface UseMarkdownInputProps {
  initialValue: string;
  onMarkdownChange?: (markdown: string, notionJson: string) => void;
}

export const useMarkdownInput = ({ initialValue, onMarkdownChange }: UseMarkdownInputProps) => {
  const [text, setText] = useState<string>(initialValue);
  const [error, setError] = useState<string>('');
  
  // Separate copy hooks for text and JSON
  const { copySuccess: copyTextSuccess, copyToClipboard: copyText } = useCopyToClipboard();
  const { copySuccess: copyJsonSuccess, copyToClipboard: copyJson } = useCopyToClipboard();
  
  // Different debounce delays for different purposes
  const debouncedText = useDebounce(text, 300); // For JSON generation
  const previewText = useDebounce(text, 1200); // For preview to allow complete typing

  // Generate Notion JSON
  const notionJson = useMemo(() => {
    return generateNotionJson(debouncedText);
  }, [debouncedText]);

  // Call callback when markdown or JSON changes
  useEffect(() => {
    if (onMarkdownChange) {
      onMarkdownChange(text, notionJson);
    }
  }, [text, notionJson, onMarkdownChange]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError('');

    try {
      const content = await readMarkdownFile(file);
      setText(content);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconegut';
      setError(errorMessage);
    }
  };

  const handleCopyText = async () => {
    try {
      await copyText(text);
    } catch {
      setError("No s'ha pogut copiar el text");
    }
  };

  const handleCopyJson = async () => {
    try {
      await copyJson(notionJson);
    } catch {
      setError("No s'ha pogut copiar el JSON");
    }
  };

  return {
    text,
    setText,
    error,
    previewText,
    notionJson,
    copyTextSuccess,
    copyJsonSuccess,
    handleFileChange,
    handleCopyText,
    handleCopyJson,
  };
};

export const readMarkdownFile = async (file: File): Promise<string> => {
  if (!file.name.endsWith('.md')) {
    throw new Error("Només es permeten fitxers '.md'.");
  }

  try {
    return await file.text();
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Error desconegut';
    throw new Error(`Error en llegir fitxer: ${errorMessage}`);
  }
};

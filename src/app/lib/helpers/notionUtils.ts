import { markdownToBlocks } from '../utils/markdownToNotion';

export const generateNotionJson = (text: string): string => {
  // Don't process if text is empty
  if (!text.trim()) {
    return JSON.stringify([], null, 2);
  }

  try {
    const blocks = markdownToBlocks(text);
    return JSON.stringify(blocks, null, 2);
  } catch (error) {
    console.warn('Error generant JSON de Notion en temps real:', error);
    // Return a safe fallback instead of throwing
    return JSON.stringify([{
      type: 'paragraph',
      paragraph: {
        rich_text: [{
          type: 'text',
          text: { content: 'Error en la conversió en temps real', link: null },
          annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'red' },
          plain_text: 'Error en la conversió en temps real',
          href: null
        }],
        color: 'default'
      }
    }], null, 2);
  }
};

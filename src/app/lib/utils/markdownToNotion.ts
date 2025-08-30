import { markdownToAST } from './Markdown2AST';
import { astToNotionBlocks } from './AST2Notion';

// Notion API Types (re-export for compatibility)
interface NotionBlock {
  type: string;
  [key: string]: unknown;
}

export function markdownToBlocks(markdown: string): NotionBlock[] {
  try {
    // Handle empty input gracefully
    if (!markdown || !markdown.trim()) {
      return [{
        type: 'paragraph',
        paragraph: {
          rich_text: [{
            type: 'text',
            text: { content: '', link: null },
            annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' },
            plain_text: '',
            href: null
          }],
          color: 'default'
        }
      }];
    }

    // Parse markdown to AST
    const parseResult = markdownToAST(markdown);
    
    if (!parseResult.success) {
      console.warn('Error parsing markdown (temps real):', parseResult.errors);
      // Return the original text as a paragraph for real-time editing
      return [{
        type: 'paragraph',
        paragraph: {
          rich_text: [{
            type: 'text',
            text: { content: markdown.length > 100 ? markdown.substring(0, 100) + '...' : markdown, link: null },
            annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' },
            plain_text: markdown.length > 100 ? markdown.substring(0, 100) + '...' : markdown,
            href: null
          }],
          color: 'default'
        }
      }];
    }

    if (parseResult.warnings && parseResult.warnings.length > 0) {
      console.warn('Warnings during markdown parsing:', parseResult.warnings);
    }

    // Convert AST to Notion blocks
    const blocks = astToNotionBlocks(parseResult.ast!, parseResult.equations || {});
    
    return blocks;
  } catch (error) {
    console.error('Error converting markdown to blocks:', error);
    // Return a simple text block with error message as fallback
    return [{
      type: 'paragraph',
      paragraph: {
        rich_text: [{
          type: 'text',
          text: { content: 'Error inesperat en la conversió', link: null },
          annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'red' },
          plain_text: 'Error inesperat en la conversió',
          href: null
        }],
        color: 'default'
      }
    }];
  }
}

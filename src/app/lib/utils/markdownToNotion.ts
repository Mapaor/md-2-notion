import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';

// AST Node types
interface ASTNode {
  type: string;
  value?: string;
  children?: ASTNode[];
  depth?: number;
  ordered?: boolean;
  checked?: boolean | null;
  lang?: string;
  url?: string;
  [key: string]: unknown;
}

// Notion API Types
interface NotionRichText {
  type: 'text' | 'equation' | 'mention';
  text?: {
    content: string;
    link?: { url: string } | null;
  };
  equation?: {
    expression: string;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href?: string | null;
}

interface NotionBlock {
  type: string;
  [key: string]: unknown;
}

// Helper function to create rich text objects
function createRichText(
  content: string, 
  annotations: Partial<NotionRichText['annotations']> = {},
  link?: string
): NotionRichText {
  return {
    type: 'text',
    text: {
      content,
      link: link ? { url: link } : null
    },
    annotations: {
      bold: false,
      italic: false,
      strikethrough: false,
      underline: false,
      code: false,
      color: 'default',
      ...annotations
    },
    plain_text: content,
    href: link || null
  };
}

// Helper function to create equation rich text
function createEquationRichText(expression: string): NotionRichText {
  return {
    type: 'equation',
    equation: {
      expression
    },
    annotations: {
      bold: false,
      italic: false,
      strikethrough: false,
      underline: false,
      code: false,
      color: 'default'
    },
    plain_text: expression,
    href: null
  };
}

// Process inline markdown formatting (bold, italic, code, etc.)
function processInlineFormatting(node: ASTNode): NotionRichText[] {
  const richTexts: NotionRichText[] = [];

  if (node.type === 'text') {
    return [createRichText(node.value || '')];
  }

  if (node.type === 'strong') {
    const content = extractTextFromNode(node);
    return [createRichText(content, { bold: true })];
  }

  if (node.type === 'emphasis') {
    const content = extractTextFromNode(node);
    return [createRichText(content, { italic: true })];
  }

  if (node.type === 'delete') {
    const content = extractTextFromNode(node);
    return [createRichText(content, { strikethrough: true })];
  }

  if (node.type === 'inlineCode') {
    return [createRichText(node.value || '', { code: true })];
  }

  if (node.type === 'link') {
    const content = extractTextFromNode(node);
    return [createRichText(content, {}, node.url as string)];
  }

  // Handle inline math equations
  if (node.type === 'inlineMath') {
    return [createEquationRichText(node.value || '')];
  }

  // Process children for complex inline elements
  if (node.children) {
    for (const child of node.children) {
      richTexts.push(...processInlineFormatting(child));
    }
  }

  return richTexts;
}

// Convert paragraph content to rich text array
function paragraphToRichText(node: ASTNode): NotionRichText[] {
  const richTexts: NotionRichText[] = [];
  
  if (node.children) {
    for (const child of node.children) {
      richTexts.push(...processInlineFormatting(child));
    }
  }

  return richTexts.length > 0 ? richTexts : [createRichText('')];
}

// Extract plain text from any node
function extractTextFromNode(node: ASTNode): string {
  if (node.type === 'text') {
    return node.value || '';
  }
  if (node.children) {
    return node.children.map(extractTextFromNode).join('');
  }
  return '';
}

// Block creation functions
function createParagraphBlock(richText: NotionRichText[]): NotionBlock {
  return {
    type: 'paragraph',
    paragraph: {
      rich_text: richText,
      color: 'default'
    }
  };
}

function createHeadingBlock(level: number, richText: NotionRichText[]): NotionBlock {
  const headingType = level === 1 ? 'heading_1' : level === 2 ? 'heading_2' : 'heading_3';
  return {
    type: headingType,
    [headingType]: {
      rich_text: richText,
      color: 'default',
      is_toggleable: false
    }
  };
}

function createCodeBlock(content: string, language?: string): NotionBlock {
  // Map common language names to Notion's supported languages
  const languageMap: { [key: string]: string } = {
    'js': 'javascript',
    'ts': 'typescript',
    'jsx': 'javascript',
    'tsx': 'typescript',
    'py': 'python',
    'rb': 'ruby',
    'sh': 'bash',
    'shell': 'bash',
    'yml': 'yaml',
    'md': 'markdown'
  };

  const notionLanguage = language ? (languageMap[language] || language) : 'plain text';

  return {
    type: 'code',
    code: {
      caption: [],
      rich_text: [createRichText(content)],
      language: notionLanguage
    }
  };
}

function createBulletedListItem(richText: NotionRichText[]): NotionBlock {
  return {
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: richText,
      color: 'default'
    }
  };
}

function createNumberedListItem(richText: NotionRichText[]): NotionBlock {
  return {
    type: 'numbered_list_item',
    numbered_list_item: {
      rich_text: richText,
      color: 'default'
    }
  };
}

function createQuoteBlock(richText: NotionRichText[]): NotionBlock {
  return {
    type: 'quote',
    quote: {
      rich_text: richText,
      color: 'default'
    }
  };
}

function createDividerBlock(): NotionBlock {
  return {
    type: 'divider',
    divider: {}
  };
}

function createEquationBlock(expression: string): NotionBlock {
  return {
    type: 'equation',
    equation: {
      expression
    }
  };
}

function createToDoItem(richText: NotionRichText[], checked: boolean = false): NotionBlock {
  return {
    type: 'to_do',
    to_do: {
      rich_text: richText,
      checked,
      color: 'default'
    }
  };
}

function createTableBlock(rows: NotionRichText[][][], hasColumnHeader: boolean = false): NotionBlock[] {
  if (rows.length === 0) return [];

  const tableWidth = Math.max(...rows.map(row => row.length));
  const blocks: NotionBlock[] = [];

  // Create table block
  blocks.push({
    type: 'table',
    table: {
      table_width: tableWidth,
      has_column_header: hasColumnHeader,
      has_row_header: false
    }
  });

  // Create table rows
  for (const row of rows) {
    // Pad row to table width
    const paddedRow = [...row];
    while (paddedRow.length < tableWidth) {
      paddedRow.push([createRichText('')]);
    }

    blocks.push({
      type: 'table_row',
      table_row: {
        cells: paddedRow
      }
    });
  }

  return blocks;
}

function createCalloutBlock(richText: NotionRichText[], emoji: string = '💡'): NotionBlock {
  return {
    type: 'callout',
    callout: {
      rich_text: richText,
      icon: {
        emoji: emoji
      },
      color: 'default'
    }
  };
}

// Main conversion function for individual nodes
function nodeToNotionBlocks(node: ASTNode): NotionBlock[] {
  const blocks: NotionBlock[] = [];

  switch (node.type) {
    case 'heading':
      const headingRichText = paragraphToRichText(node);
      blocks.push(createHeadingBlock(node.depth || 1, headingRichText));
      break;
    
    case 'paragraph':
      const paragraphRichText = paragraphToRichText(node);
      // Only create paragraph if it has content
      if (paragraphRichText.some(rt => rt.plain_text.trim())) {
        blocks.push(createParagraphBlock(paragraphRichText));
      }
      break;
    
    case 'code':
      blocks.push(createCodeBlock(node.value || '', node.lang as string));
      break;

    case 'math':
      // Display math equation (block-level)
      blocks.push(createEquationBlock(node.value || ''));
      break;
    
    case 'blockquote':
      const quoteRichText = paragraphToRichText(node);
      blocks.push(createQuoteBlock(quoteRichText));
      break;
    
    case 'list':
      if (node.children) {
        node.children.forEach((listItem: ASTNode) => {
          const itemRichText = paragraphToRichText(listItem);
          
          // Check if it's a task list item
          // Task list items have checked property as true or false (not null)
          // Regular list items have checked: null
          if (typeof listItem.checked === 'boolean') {
            blocks.push(createToDoItem(itemRichText, listItem.checked));
          } else if (node.ordered) {
            blocks.push(createNumberedListItem(itemRichText));
          } else {
            blocks.push(createBulletedListItem(itemRichText));
          }
        });
      }
      break;

    case 'table':
      if (node.children) {
        const rows: NotionRichText[][][] = [];
        let hasColumnHeader = false;

        node.children.forEach((row: ASTNode, index: number) => {
          if (row.type === 'tableRow') {
            const cells: NotionRichText[][] = [];
            
            if (row.children) {
              row.children.forEach((cell: ASTNode) => {
                if (cell.type === 'tableCell') {
                  cells.push(paragraphToRichText(cell));
                }
              });
            }
            
            rows.push(cells);

            // First row in a table is typically a header
            if (index === 0 && cells.some(cell => 
              cell.some(rt => rt.annotations.bold)
            )) {
              hasColumnHeader = true;
            }
          }
        });

        blocks.push(...createTableBlock(rows, hasColumnHeader));
      }
      break;
    
    case 'thematicBreak':
      blocks.push(createDividerBlock());
      break;

    // GitHub Flavored Markdown specific elements
    case 'html':
      // Handle HTML as a code block for now
      if (node.value?.trim()) {
        blocks.push(createCodeBlock(node.value, 'html'));
      }
      break;

    // Handle unknown elements by trying to extract text
    default:
      const unknownText = extractTextFromNode(node);
      if (unknownText.trim()) {
        blocks.push(createParagraphBlock([createRichText(unknownText)]));
      }
      break;
  }

  return blocks;
}

export function markdownToBlocks(markdown: string): NotionBlock[] {
  try {
    // Return empty paragraph for empty input
    if (!markdown || !markdown.trim()) {
      return [createParagraphBlock([createRichText('')])];
    }

    // Start with basic processor - add plugins gradually
    let processor = unified().use(remarkParse);
    
    // Add GFM support with error handling
    try {
      // @ts-expect-error - Version compatibility issues between unified packages
      processor = processor.use(remarkGfm);
    } catch (gfmError) {
      console.warn('GFM plugin failed to load:', gfmError);
    }

    // Skip math plugin for now due to version conflicts
    // TODO: Re-enable when unified ecosystem versions are compatible
    // try {
    //   processor = processor.use(remarkMath);
    // } catch (mathError) {
    //   console.warn('Math plugin failed to load:', mathError);
    // }

    let tree: ASTNode;
    try {
      const result = processor.parse(markdown);
      if (!result) {
        console.error('Parser returned undefined/null');
        return [createParagraphBlock([createRichText(markdown)])];
      }
      tree = result as ASTNode;
    } catch (parseError) {
      console.error('Error parsing markdown:', parseError);
      // Final fallback: treat as plain text
      return [createParagraphBlock([createRichText(markdown)])];
    }

    const blocks: NotionBlock[] = [];

    if (tree.children) {
      tree.children.forEach((node: ASTNode) => {
        blocks.push(...nodeToNotionBlocks(node));
      });
    }

    // If no blocks were created, create a single empty paragraph
    if (blocks.length === 0) {
      blocks.push(createParagraphBlock([createRichText('')]));
    }

    return blocks;
  } catch (error) {
    console.error('Error parsing markdown:', error);
    // Return a simple text block with the original markdown as fallback
    return [createParagraphBlock([createRichText(markdown)])];
  }
}

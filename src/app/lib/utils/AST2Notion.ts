import type { ASTNode } from './Markdown2AST';

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
function processInlineFormatting(node: ASTNode, equations: { [key: string]: string } = {}): NotionRichText[] {
  const richTexts: NotionRichText[] = [];

  if (node.type === 'text') {
    const text = node.value || '';
    
    // Check if text contains equation placeholders
    const parts = text.split(/((?:INLINE|BLOCK)_EQUATION_\d+_PLACEHOLDER)/);
    
    for (const part of parts) {
      if (part.match(/^INLINE_EQUATION_\d+_PLACEHOLDER$/)) {
        // Inline equation
        const equation = equations[part];
        if (equation) {
          richTexts.push(createEquationRichText(equation));
        } else {
          richTexts.push(createRichText(part));
        }
      } else if (part) {
        // Regular text
        richTexts.push(createRichText(part));
      }
    }
    
    return richTexts.length > 0 ? richTexts : [createRichText(text)];
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

  // Handle images - convert to standalone image blocks
  if (node.type === 'image') {
    // Images should be handled as separate blocks, not inline
    // Return empty array here, images will be handled at paragraph level
    return [];
  }

  // Handle inline math equations
  if (node.type === 'inlineMath') {
    return [createEquationRichText(node.value || '')];
  }

  // Process children for complex inline elements
  if (node.children) {
    for (const child of node.children) {
      richTexts.push(...processInlineFormatting(child, equations));
    }
  }

  return richTexts;
}

// Convert paragraph content to rich text array
function paragraphToRichText(node: ASTNode, equations: { [key: string]: string } = {}): NotionRichText[] {
  const richTexts: NotionRichText[] = [];
  
  if (node.children) {
    for (const child of node.children) {
      richTexts.push(...processInlineFormatting(child, equations));
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

function createImageBlock(url: string, caption?: string): NotionBlock {
  const imageBlock: NotionBlock = {
    type: 'image',
    image: {
      type: 'external',
      external: {
        url: url
      },
      caption: caption && caption.trim() ? [createRichText(caption)] : []
    }
  };

  return imageBlock;
}

// Main conversion function for individual nodes
function nodeToNotionBlocks(node: ASTNode, equations: { [key: string]: string } = {}): NotionBlock[] {
  const blocks: NotionBlock[] = [];

  switch (node.type) {
    case 'heading':
      const headingRichText = paragraphToRichText(node, equations);
      blocks.push(createHeadingBlock(node.depth || 1, headingRichText));
      break;
    
    case 'paragraph':
      const content = extractTextFromNode(node);
      
      // Check if this paragraph contains images
      const hasImages = node.children?.some(child => child.type === 'image');
      
      if (hasImages && node.children) {
        // Process each child separately
        for (const child of node.children) {
          if (child.type === 'image') {
            if (child.url) {
              const alt = child.alt || '';
              blocks.push(createImageBlock(child.url, alt));
            }
          } else {
            // Process other content as normal paragraph
            const childRichText = processInlineFormatting(child, equations);
            if (childRichText.some(rt => rt.plain_text.trim())) {
              blocks.push(createParagraphBlock(childRichText));
            }
          }
        }
      } else {
        // Check if this paragraph is just a block equation placeholder
        if (content.trim().match(/^BLOCK_EQUATION_\d+_PLACEHOLDER$/)) {
          const equation = equations[content.trim()];
          if (equation) {
            blocks.push(createEquationBlock(equation));
          } else {
            const paragraphRichText = paragraphToRichText(node, equations);
            if (paragraphRichText.some(rt => rt.plain_text.trim())) {
              blocks.push(createParagraphBlock(paragraphRichText));
            }
          }
        } else {
          const paragraphRichText = paragraphToRichText(node, equations);
          // Only create paragraph if it has content
          if (paragraphRichText.some(rt => rt.plain_text.trim())) {
            blocks.push(createParagraphBlock(paragraphRichText));
          }
        }
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
      const quoteRichText = paragraphToRichText(node, equations);
      blocks.push(createQuoteBlock(quoteRichText));
      break;
    
    case 'list':
      if (node.children) {
        node.children.forEach((listItem: ASTNode) => {
          const itemRichText = paragraphToRichText(listItem, equations);
          
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
                  cells.push(paragraphToRichText(cell, equations));
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

    case 'image':
      // Handle images - check if URL is valid
      if (node.url) {
        const alt = node.alt || '';
        blocks.push(createImageBlock(node.url, alt));
      }
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

export function astToNotionBlocks(ast: ASTNode, equations: { [key: string]: string } = {}): NotionBlock[] {
  try {
    const blocks: NotionBlock[] = [];

  if (ast.children) {
    ast.children.forEach((node: ASTNode) => {
      blocks.push(...nodeToNotionBlocks(node, equations));
    });
  }    // If no blocks were created, create a single empty paragraph
    if (blocks.length === 0) {
      blocks.push(createParagraphBlock([createRichText('')]));
    }

    return blocks;
  } catch (error) {
    console.error('Error converting AST to Notion blocks:', error);
    // Return a simple text block as fallback
    return [createParagraphBlock([createRichText('Error en la conversió')])];
  }
}

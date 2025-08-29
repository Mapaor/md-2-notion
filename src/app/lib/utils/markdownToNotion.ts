import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

interface NotionBlock {
  type: string;
  [key: string]: any;
}

function createTextBlock(content: string): NotionBlock {
  return {
    type: "paragraph",
    paragraph: {
      rich_text: [
        {
          type: "text",
          text: {
            content: content,
            link: null
          }
        }
      ],
      color: "default"
    }
  };
}

function createHeadingBlock(level: number, content: string): NotionBlock {
  const headingType = level === 1 ? "heading_1" : level === 2 ? "heading_2" : "heading_3";
  return {
    type: headingType,
    [headingType]: {
      rich_text: [
        {
          type: "text",
          text: {
            content: content,
            link: null
          }
        }
      ],
      color: "default"
    }
  };
}

function createCodeBlock(content: string, language?: string): NotionBlock {
  return {
    type: "code",
    code: {
      caption: [],
      rich_text: [
        {
          type: "text",
          text: {
            content: content,
            link: null
          }
        }
      ],
      language: language || "plain text"
    }
  };
}

function createBulletedListItem(content: string): NotionBlock {
  return {
    type: "bulleted_list_item",
    bulleted_list_item: {
      rich_text: [
        {
          type: "text",
          text: {
            content: content,
            link: null
          }
        }
      ],
      color: "default"
    }
  };
}

function createNumberedListItem(content: string): NotionBlock {
  return {
    type: "numbered_list_item",
    numbered_list_item: {
      rich_text: [
        {
          type: "text",
          text: {
            content: content,
            link: null
          }
        }
      ],
      color: "default"
    }
  };
}

function createQuoteBlock(content: string): NotionBlock {
  return {
    type: "quote",
    quote: {
      rich_text: [
        {
          type: "text",
          text: {
            content: content,
            link: null
          }
        }
      ],
      color: "default"
    }
  };
}

function extractTextFromNode(node: any): string {
  if (node.type === 'text') {
    return node.value;
  }
  if (node.children) {
    return node.children.map(extractTextFromNode).join('');
  }
  return '';
}

function nodeToNotionBlocks(node: any): NotionBlock[] {
  const blocks: NotionBlock[] = [];

  switch (node.type) {
    case 'heading':
      blocks.push(createHeadingBlock(node.depth, extractTextFromNode(node)));
      break;
    
    case 'paragraph':
      const text = extractTextFromNode(node);
      if (text.trim()) {
        blocks.push(createTextBlock(text));
      }
      break;
    
    case 'code':
      blocks.push(createCodeBlock(node.value, node.lang));
      break;
    
    case 'blockquote':
      const quoteText = extractTextFromNode(node);
      blocks.push(createQuoteBlock(quoteText));
      break;
    
    case 'list':
      if (node.children) {
        node.children.forEach((listItem: any) => {
          const itemText = extractTextFromNode(listItem);
          if (node.ordered) {
            blocks.push(createNumberedListItem(itemText));
          } else {
            blocks.push(createBulletedListItem(itemText));
          }
        });
      }
      break;
    
    case 'thematicBreak':
      blocks.push({
        type: "divider",
        divider: {}
      });
      break;
    
    default:
      // For unknown node types, try to extract text and create a paragraph
      const unknownText = extractTextFromNode(node);
      if (unknownText.trim()) {
        blocks.push(createTextBlock(unknownText));
      }
      break;
  }

  return blocks;
}

export function markdownToBlocks(markdown: string): NotionBlock[] {
  try {
    const processor = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkMath);

    const tree = processor.parse(markdown);
    const blocks: NotionBlock[] = [];

    if (tree.children) {
      tree.children.forEach((node: any) => {
        blocks.push(...nodeToNotionBlocks(node));
      });
    }

    // If no blocks were created, create a single empty paragraph
    if (blocks.length === 0) {
      blocks.push(createTextBlock(''));
    }

    return blocks;
  } catch (error) {
    console.error('Error parsing markdown:', error);
    // Return a simple text block with the original markdown as fallback
    return [createTextBlock(markdown)];
  }
}

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';

// AST Node types
export interface ASTNode {
  type: string;
  value?: string;
  children?: ASTNode[];
  depth?: number;
  ordered?: boolean;
  checked?: boolean | null;
  lang?: string;
  url?: string;
  alt?: string;
  [key: string]: unknown;
}

export interface ParseResult {
  success: boolean;
  ast?: ASTNode;
  processedMarkdown?: string;
  equations?: { [key: string]: string };
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
}

// Pre-process markdown to handle math equations
function preprocessMarkdown(markdown: string): { processed: string; equations: { [key: string]: string }; warnings: string[] } {
  const equations: { [key: string]: string } = {};
  const warnings: string[] = [];
  let processed = markdown;
  let equationCounter = 0;

  // Normal processing for all markdown
  // Handle block math equations ($$...$$)
  processed = processed.replace(/\$\$([\s\S]*?)\$\$/g, (match, equation) => {
    const placeholder = `BLOCK_EQUATION_${equationCounter}_PLACEHOLDER`;
    const cleanEquation = equation.trim();
    
    if (!cleanEquation) {
      warnings.push(`Equació de bloc buida trobada: ${match}`);
    }
    
    equations[placeholder] = cleanEquation;
    equationCounter++;
    return `\n\n${placeholder}\n\n`;
  });

  // Handle inline math equations ($...$)
  processed = processed.replace(/\$([^$\n]+?)\$/g, (match, equation) => {
    const placeholder = `INLINE_EQUATION_${equationCounter}_PLACEHOLDER`;
    const cleanEquation = equation.trim();
    
    if (!cleanEquation) {
      warnings.push(`Equació inline buida trobada: ${match}`);
    }
    
    equations[placeholder] = cleanEquation;
    equationCounter++;
    return placeholder;
  });

  return { processed, equations, warnings };
}

// Validate AST structure
function validateAST(ast: ASTNode): string[] {
  const errors: string[] = [];
  
  function traverse(node: ASTNode, path: string = 'root') {
    // Check for common issues
    if (node.type === 'image' && !node.url) {
      errors.push(`Imatge sense URL trobada a: ${path}`);
    }
    
    if (node.type === 'link' && !node.url) {
      errors.push(`Enllaç sense URL trobat a: ${path}`);
    }
    
    if (node.type === 'code' && !node.value) {
      errors.push(`Bloc de codi buit trobat a: ${path}`);
    }
    
    // Check children
    if (node.children) {
      node.children.forEach((child, index) => {
        traverse(child, `${path} > ${child.type}[${index}]`);
      });
    }
  }
  
  traverse(ast);
  return errors;
}

// Main parsing function
export function markdownToAST(markdown: string): ParseResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    // Return error for empty input
    if (!markdown || !markdown.trim()) {
      return {
        success: false,
        errors: ['El markdown està buit']
      };
    }

    // Pre-process markdown to extract equations
    const { processed: processedMarkdown, equations, warnings: preprocessWarnings } = preprocessMarkdown(markdown);
    warnings.push(...preprocessWarnings);

    // Start with basic processor - add plugins gradually
    let processor = unified().use(remarkParse);
    
    // Add GFM support with error handling
    let gfmEnabled = false;
    try {
      // @ts-expect-error - Version compatibility issues between unified packages
      processor = processor.use(remarkGfm);
      gfmEnabled = true;
    } catch {
      warnings.push('Plugin GFM no s\'ha pogut carregar');
    }

    let ast: ASTNode;
    try {
      const result = processor.parse(processedMarkdown);
      if (!result) {
        return {
          success: false,
          errors: ['El parser ha retornat un resultat buit']
        };
      }
      ast = result as ASTNode;
    } catch (parseError) {
      // If GFM was enabled and parsing failed, try without it
      if (gfmEnabled) {
        warnings.push('Error amb GFM, provant sense GFM');
        try {
          const basicProcessor = unified().use(remarkParse);
          const result = basicProcessor.parse(processedMarkdown);
          if (!result) {
            return {
              success: false,
              errors: ['El parser bàsic també ha fallat']
            };
          }
          ast = result as ASTNode;
          warnings.push('Parsing completat sense GFM');
        } catch (basicError) {
          return {
            success: false,
            errors: [`Error en el parsing: ${basicError instanceof Error ? basicError.message : 'Error desconegut'}`]
          };
        }
      } else {
        return {
          success: false,
          errors: [`Error en el parsing: ${parseError instanceof Error ? parseError.message : 'Error desconegut'}`]
        };
      }
    }

    // Validate AST
    const validationErrors = validateAST(ast);
    errors.push(...validationErrors);

    // Count different types of nodes for statistics
    const nodeStats = getNodeStatistics(ast);

    const totalNodes = Object.values(nodeStats).reduce((sum, count) => sum + count, 0);
    const statistics = {
      totalNodes,
      nodeTypes: nodeStats,
      hasEquations: Object.keys(equations).length > 0 || nodeStats.math > 0 || nodeStats.inlineMath > 0,
      hasImages: nodeStats.image > 0,
      hasTables: nodeStats.table > 0,
      hasCodeBlocks: nodeStats.code > 0
    };

    return {
      success: errors.length === 0,
      ast,
      processedMarkdown,
      equations,
      errors: errors.length > 0 ? errors : undefined,
      warnings: warnings.length > 0 ? warnings : undefined,
      statistics
    };

  } catch (error) {
    return {
      success: false,
      errors: [`Error inesperat: ${error instanceof Error ? error.message : 'Error desconegut'}`]
    };
  }
}

// Get statistics about the AST
function getNodeStatistics(ast: ASTNode): { [key: string]: number } {
  const stats: { [key: string]: number } = {};
  
  function countNodes(node: ASTNode) {
    stats[node.type] = (stats[node.type] || 0) + 1;
    
    if (node.children) {
      node.children.forEach(countNodes);
    }
  }
  
  countNodes(ast);
  return stats;
}

// Export for debugging purposes
export { preprocessMarkdown, validateAST, getNodeStatistics };

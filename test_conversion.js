// Test script to verify markdown to Notion conversion
import { markdownToBlocks } from './src/app/lib/utils/markdownToNotion.js';

const testMarkdown = `# Test

## Equacions

Inline equation: $e^{i\\pi}+1=0$

Block equation:
$$
e^{i\\pi }=\\cos \\pi +i\\sin \\pi
$$

## Imatges

![Test image](https://example.com/image.jpg)
`;

console.log('Testing markdown conversion...');
try {
  const blocks = markdownToBlocks(testMarkdown);
  console.log('Conversion successful!');
  console.log('Generated blocks:', JSON.stringify(blocks, null, 2));
} catch (error) {
  console.error('Conversion failed:', error);
}

import { markdownToBlocks } from './src/app/lib/utils/markdownToNotion.js';

// Test markdown amb equacions i imatges
const testMarkdown = `# Test de conversió

## Equacions

Text normal amb equació inline: $e^{i\\pi}+1=0$ i més text.

Equació en bloc:

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

## Imatges

![Alt text per la imatge](https://example.com/image.jpg)

## Llista amb equacions

- Element amb equació: $x^2 + y^2 = r^2$
- Element normal

## Text normal

Això és només text sense equacions.
`;

console.log('Provant conversió de markdown amb equacions...');

try {
  const blocks = markdownToBlocks(testMarkdown);
  console.log('✅ Conversió exitosa!');
  console.log(`✅ Generats ${blocks.length} blocs`);
  
  // Comprovem si hi ha blocs d'equació
  const equationBlocks = blocks.filter(block => block.type === 'equation');
  console.log(`✅ Trobats ${equationBlocks.length} blocs d'equació`);
  
  // Comprovem si hi ha blocs d'imatge
  const imageBlocks = blocks.filter(block => block.type === 'image');
  console.log(`✅ Trobats ${imageBlocks.length} blocs d'imatge`);
  
  // Mostra alguns exemples
  console.log('\\n--- Exemple de blocs generats ---');
  blocks.slice(0, 5).forEach((block, index) => {
    console.log(`${index + 1}. Tipus: ${block.type}`);
  });
  
} catch (error) {
  console.error('❌ Error en la conversió:', error.message);
}

import { ColorConfig } from './types';

export function exportConfig(colors: ColorConfig) {
  const css = generateCss(colors);
  const blob = new Blob([css], { type: 'text/css' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'chart-colors.css';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function generateCss(colors: ColorConfig): string {
  const lightMode = colors.light
    .map((color, i) => `  --chart-${i + 1}: ${color};`)
    .join('\n');

  const darkMode = colors.dark
    .map((color, i) => `  --chart-${i + 1}: ${color};`)
    .join('\n');

  return `:root {\n${lightMode}\n}\n\n.dark {\n${darkMode}\n}`;
}
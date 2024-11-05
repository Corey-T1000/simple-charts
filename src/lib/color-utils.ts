import { NamedColor } from './types';

interface HSL {
  h: number;
  s: number;
  l: number;
}

function hexToHsl(hex: string): HSL {
  // Remove # if present
  hex = hex.replace(/^#/, '');

  // Parse hex values
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function findBaseColors(colors: NamedColor[]): NamedColor[] {
  // Group colors by their base name (before the hyphen)
  const baseGroups = new Map<string, NamedColor[]>();
  
  colors.forEach(color => {
    const baseName = color.name.split('-')[0];
    if (!baseGroups.has(baseName)) {
      baseGroups.set(baseName, []);
    }
    baseGroups.get(baseName)?.push(color);
  });

  // For each group, find the color with saturation and lightness closest to ideal values
  const idealS = 65; // Ideal saturation
  const idealL = 55; // Ideal lightness
  
  return Array.from(baseGroups.values()).map(group => {
    return group.reduce((best, current) => {
      const currentHsl = hexToHsl(current.value);
      const bestHsl = hexToHsl(best.value);
      
      const currentDist = Math.abs(currentHsl.s - idealS) + Math.abs(currentHsl.l - idealL);
      const bestDist = Math.abs(bestHsl.s - idealS) + Math.abs(bestHsl.l - idealL);
      
      return currentDist < bestDist ? current : best;
    }, group[0]);
  });
}

function adjustColor(color: string, lightnessDiff: number): string {
  const hsl = hexToHsl(color);
  const newL = Math.max(30, Math.min(70, hsl.l + lightnessDiff));
  return hslToHex(hsl.h, hsl.s, newL);
}

export function generateAccessiblePalette(colors: NamedColor[], count: number): string[] {
  if (colors.length === 0) return [];

  // Find representative colors from each color family
  const baseColors = findBaseColors(colors);
  
  // If we don't have enough base colors, use variations of existing ones
  while (baseColors.length < count) {
    const sourceColor = baseColors[baseColors.length % baseColors.length];
    const hsl = hexToHsl(sourceColor.value);
    const newHue = (hsl.h + 30) % 360; // Shift hue by 30 degrees
    baseColors.push({
      name: `${sourceColor.name}-variant`,
      value: hslToHex(newHue, hsl.s, hsl.l)
    });
  }

  // Create the light mode palette
  const lightPalette = baseColors.slice(0, count).map((color, i) => {
    const hsl = hexToHsl(color.value);
    // Adjust lightness based on position to create visual hierarchy
    const lightness = Math.min(70, Math.max(45, hsl.l + (i * 2)));
    return hslToHex(hsl.h, hsl.s, lightness);
  });

  return lightPalette;
}
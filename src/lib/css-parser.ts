import { ColorConfig, NamedColor } from './types';

interface CssVariables {
  [key: string]: string;
}

export function parseCssColors(css: string): ColorConfig {
  const variables = extractCssVariables(css);
  const lightColors = extractAllColors(css, ':root', variables);
  const darkColors = extractAllColors(css, '.dark', variables);

  return {
    light: lightColors,
    dark: darkColors,
  };
}

export function parseNamedColors(css: string): NamedColor[] {
  const namedColors: NamedColor[] = [];
  const hslRegex = /--([a-zA-Z0-9-]+):\s*(\d+)\s+(\d+)%?\s+(\d+)%/g;
  const hexRegex = /--([a-zA-Z0-9-]+):\s*(#[A-Fa-f0-9]{6})/g;
  
  let match;
  
  // Parse HSL colors
  while ((match = hslRegex.exec(css)) !== null) {
    const [, name, h, s, l] = match;
    const color = hslToHex(
      parseInt(h, 10),
      parseInt(s, 10),
      parseInt(l, 10)
    );
    namedColors.push({ name, value: color });
  }

  // Parse Hex colors
  while ((match = hexRegex.exec(css)) !== null) {
    const [, name, color] = match;
    namedColors.push({ name, value: color });
  }

  return namedColors;
}

function extractCssVariables(css: string): CssVariables {
  const variables: CssVariables = {};
  const varRegex = /--[\w-]+:\s*([^;]+);/g;
  let match;

  while ((match = varRegex.exec(css)) !== null) {
    const value = match[1].trim();
    const name = match[0].split(':')[0].trim();
    variables[name] = value;
  }

  return variables;
}

function extractAllColors(
  css: string,
  selector: string,
  variables: CssVariables
): string[] {
  const colors: string[] = [];
  const selectorContent = extractSelectorContent(css, selector);

  if (!selectorContent) {
    // If no selector found, try parsing the entire CSS as a list of variables
    const colorVars = parseColorVariables(css);
    if (colorVars.length > 0) {
      return colorVars;
    }
    return colors;
  }

  // First try to get chart-specific colors
  const chartColors = extractColorsByPattern(
    selectorContent,
    /--chart-\d+:\s*([^;]+);/g,
    variables
  );

  if (chartColors.length === 0) {
    const colorVars = parseColorVariables(selectorContent);
    if (colorVars.length > 0) {
      return colorVars;
    }

    // Get semantic colors first (they're usually more important)
    const semanticColors = extractColorsByPattern(
      selectorContent,
      /--(?:primary|secondary|accent|muted|background|foreground|success|warning|error|destructive|creative)(?:-foreground)?:\s*([^;]+);/g,
      variables
    );

    // Then get any other color variables
    const otherColors = extractColorsByPattern(
      selectorContent,
      /--[\w-]+(?:-\d+)?:\s*([^;]+);/g,
      variables
    ).filter(color => !semanticColors.includes(color));

    colors.push(...semanticColors, ...otherColors);
  } else {
    colors.push(...chartColors);
  }

  return colors;
}

function extractColorsByPattern(
  content: string,
  pattern: RegExp,
  variables: CssVariables
): string[] {
  const colors: string[] = [];
  let match;

  while ((match = pattern.exec(content)) !== null) {
    const value = match[1].trim();
    const resolvedColor = resolveColorValue(value, variables);
    if (resolvedColor && !colors.includes(resolvedColor)) {
      colors.push(resolvedColor);
    }
  }

  return colors;
}

function extractSelectorContent(css: string, selector: string): string | null {
  const selectorRegex = new RegExp(
    `${selector}\\s*{([^}]*)}`,
    'g'
  );
  const match = selectorRegex.exec(css);
  return match ? match[1] : null;
}

function parseColorVariables(css: string): string[] {
  const colors: string[] = [];
  const hslRegex = /--[\w-]+:\s*(\d+)\s+(\d+)%?\s+(\d+)%/g;
  let match;

  while ((match = hslRegex.exec(css)) !== null) {
    const [, h, s, l] = match;
    const color = hslToHex(
      parseInt(h, 10),
      parseInt(s, 10),
      parseInt(l, 10)
    );
    if (!colors.includes(color)) {
      colors.push(color);
    }
  }

  return colors;
}

function resolveColorValue(value: string, variables: CssVariables): string {
  // Handle var() references
  if (value.startsWith('var(')) {
    const varName = value.slice(4, -1).trim();
    const resolvedValue = variables[varName];
    if (resolvedValue) {
      return resolveColorValue(resolvedValue, variables);
    }
    return '#000000';
  }

  // Handle HSL colors
  if (value.includes(' ')) {
    const [h, s, l] = value.split(' ').map((v) => parseFloat(v));
    if (!isNaN(h) && !isNaN(s) && !isNaN(l)) {
      return hslToHex(h, s, l);
    }
  }

  // Return as is if it's a hex color
  if (value.startsWith('#')) {
    return value;
  }

  return '#000000';
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  const rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0');
  const gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0');
  const bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0');

  return `#${rHex}${gHex}${bHex}`;
}
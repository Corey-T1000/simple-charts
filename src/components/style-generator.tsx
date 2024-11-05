import { useState } from 'react';
import { ColorPalette } from '@/components/color-palette';
import { ChartPreview } from '@/components/chart-preview';
import { CssImporter } from '@/components/css-importer';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { exportConfig } from '@/lib/export-utils';
import { ColorConfig, NamedColor } from '@/lib/types';
import { parseNamedColors } from '@/lib/css-parser';

const defaultColors: ColorConfig = {
  light: Array(8).fill('#000000'),
  dark: Array(8).fill('#ffffff'),
};

export function StyleGenerator() {
  const [colors, setColors] = useState<ColorConfig>(defaultColors);
  const [availableColors, setAvailableColors] = useState<NamedColor[]>([]);

  const handleColorChange = (mode: 'light' | 'dark', index: number, color: string) => {
    setColors((prev) => ({
      ...prev,
      [mode]: prev[mode].map((c, i) => (i === index ? color : c)),
    }));
  };

  const handleAddColor = () => {
    setColors((prev) => ({
      light: [...prev.light, '#000000'],
      dark: [...prev.dark, '#ffffff'],
    }));
  };

  const handleImport = (importedColors: ColorConfig, cssText?: string) => {
    if (cssText) {
      const namedColors = parseNamedColors(cssText);
      setAvailableColors(namedColors);
    }

    setColors({
      light: [
        ...importedColors.light.slice(0, 8),
        ...Array(Math.max(0, 8 - importedColors.light.length)).fill('#000000'),
      ],
      dark: [
        ...importedColors.dark.slice(0, 8),
        ...Array(Math.max(0, 8 - importedColors.dark.length)).fill('#ffffff'),
      ],
    });
  };

  const handleExport = () => {
    exportConfig(colors);
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Left Sidebar - Chart Preview */}
      <div className="w-[400px] border-r bg-card flex flex-col">
        <div className="flex h-14 items-center justify-between px-4 border-b">
          <h1 className="text-xl font-semibold">Chart Previews</h1>
          <Button onClick={handleExport} variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          <ChartPreview colors={colors} />
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="flex h-14 items-center px-6 border-b">
          <h1 className="text-xl font-semibold">Chart Style Generator</h1>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="max-w-[1200px] p-6 space-y-8">
            <CssImporter onImport={handleImport} />
            <ColorPalette
              colors={colors}
              availableColors={availableColors}
              onColorChange={handleColorChange}
              onAddColor={handleAddColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
import { ColorConfig, NamedColor } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Plus, Palette, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { generateAccessiblePalette } from '@/lib/color-utils';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ColorPaletteProps {
  colors: ColorConfig;
  availableColors: NamedColor[];
  onColorChange: (mode: 'light' | 'dark', index: number, color: string) => void;
  onAddColor: () => void;
}

export function ColorPalette({ colors, availableColors, onColorChange, onAddColor }: ColorPaletteProps) {
  const { toast } = useToast();
  const uniqueColors = Array.from(
    new Set([
      ...availableColors.map(c => c.value),
      ...colors.light.filter(c => c !== '#000000'),
      ...colors.dark.filter(c => c !== '#ffffff'),
    ])
  );

  const getColorName = (color: string) => {
    const namedColor = availableColors.find(c => c.value.toLowerCase() === color.toLowerCase());
    return namedColor ? namedColor.name : color;
  };

  const activeColorCount = Math.min(colors.light.length, colors.dark.length);

  const handleAutoGenerate = () => {
    if (availableColors.length === 0) {
      toast({
        title: "No colors available",
        description: "Please import some colors first.",
        variant: "destructive",
      });
      return;
    }

    const suggestedPalette = generateAccessiblePalette(availableColors, activeColorCount);
    
    // Show the suggested palette in a dialog
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Wand2 className="h-4 w-4" />
            Suggest Colors
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Suggested Color Palette</DialogTitle>
            <DialogDescription>
              Here's a suggested palette based on your imported colors. Click any color to use it.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-4 gap-4 py-4">
            {suggestedPalette.map((color, index) => (
              <button
                key={index}
                className="group relative w-full h-24 rounded-lg border-2 border-border hover:border-primary transition-colors overflow-hidden"
                onClick={() => {
                  onColorChange('light', index, color);
                  onColorChange('dark', activeColorCount - 1 - index, color);
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: color }}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium">
                  Click to use
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-background/95 py-1 px-2 text-xs">
                  {getColorName(color)}
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="h-6 w-6" />
            <h2 className="text-2xl font-semibold">Available Colors</h2>
          </div>
          {handleAutoGenerate()}
        </div>
        <div className="flex flex-wrap gap-2 p-4 border rounded-lg bg-muted/30">
          {uniqueColors.map((color) => (
            <div
              key={color}
              className="group relative"
              title={getColorName(color)}
            >
              <div
                className="w-8 h-8 rounded border border-border cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
              />
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-popover px-2 py-1 rounded shadow-sm">
                {getColorName(color)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {(['light', 'dark'] as const).map((mode) => (
        <div key={mode} className="space-y-4">
          <h2 className="text-2xl font-semibold capitalize">{mode} Mode</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {colors[mode].slice(0, activeColorCount).map((color, index) => (
              <Popover key={index}>
                <PopoverTrigger asChild>
                  <button
                    className="group relative w-full h-24 rounded-lg border-2 border-border hover:border-primary transition-colors overflow-hidden"
                  >
                    <div
                      className="absolute inset-0"
                      style={{ backgroundColor: color }}
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium">
                      Click to change
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-background/95 py-1 px-2 text-xs">
                      {getColorName(color)}
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-[calc(100vw-500px)] max-w-[800px] p-4" 
                  align="start"
                  side="right"
                  sideOffset={0}
                  alignOffset={-8}
                  avoidCollisions={true}
                >
                  <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
                    {uniqueColors.map((availableColor) => (
                      <button
                        key={availableColor}
                        className={cn(
                          "w-10 h-10 rounded-md border-2 transition-all hover:scale-110",
                          color === availableColor
                            ? "border-primary ring-2 ring-primary ring-offset-2"
                            : "border-border hover:border-primary"
                        )}
                        style={{ backgroundColor: availableColor }}
                        title={getColorName(availableColor)}
                        onClick={() => onColorChange(mode, index, availableColor)}
                      />
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            ))}
            
            {activeColorCount < 20 && (
              <Button
                variant="outline"
                className="h-24 hover:border-primary"
                onClick={onAddColor}
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Color
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
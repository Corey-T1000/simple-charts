import { useState } from 'react';
import { ColorConfig } from '@/lib/types';
import { LineChartComponent } from './charts/line-chart';
import { BarChartComponent } from './charts/bar-chart';
import { PieChartComponent } from './charts/pie-chart';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

function generateData(colorCount: number) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.slice(0, colorCount).map((name) => ({
    name,
    value: Math.floor(Math.random() * 800) + 200,
  }));
}

interface ChartPreviewProps {
  colors: ColorConfig;
}

export function ChartPreview({ colors }: ChartPreviewProps) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const colorCount = Math.min(colors.light.length, colors.dark.length);
  const data = generateData(colorCount);
  const chartColors = colors[mode].slice(0, colorCount);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Preview</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
          className="gap-2"
        >
          {mode === 'light' ? (
            <>
              <Sun className="h-4 w-4" />
              Light
            </>
          ) : (
            <>
              <Moon className="h-4 w-4" />
              Dark
            </>
          )}
        </Button>
      </div>

      <div className={`space-y-6 rounded-lg ${mode === 'dark' ? 'dark bg-background' : ''}`}>
        <div className="p-4 border rounded-lg">
          <h3 className="text-base font-medium mb-4">Line Chart</h3>
          <div className="h-[200px] w-full">
            <LineChartComponent data={data} color={chartColors[0]} />
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="text-base font-medium mb-4">Bar Chart</h3>
          <div className="h-[200px] w-full">
            <BarChartComponent data={data} colors={chartColors} />
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="text-base font-medium mb-4">Pie Chart</h3>
          <div className="h-[200px] w-full">
            <PieChartComponent data={data} colors={chartColors} />
          </div>
        </div>
      </div>
    </div>
  );
}
import { LineChart as RechartsLineChart, Line, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SharedXAxis, SharedYAxis } from './shared-axis';

interface LineChartProps {
  data: Array<{ name: string; value: number }>;
  color: string;
}

export function LineChartComponent({ data, color }: LineChartProps) {
  return (
    <ResponsiveContainer>
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.2} />
        <SharedXAxis />
        <SharedYAxis />
        <Tooltip contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }} />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={{ fill: color }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
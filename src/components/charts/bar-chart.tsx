import { BarChart as RechartsBarChart, Bar, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { SharedXAxis, SharedYAxis } from './shared-axis';

interface BarChartProps {
  data: Array<{ name: string; value: number }>;
  colors: string[];
}

export function BarChartComponent({ data, colors }: BarChartProps) {
  return (
    <ResponsiveContainer>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.2} />
        <SharedXAxis />
        <SharedYAxis />
        <Tooltip contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }} />
        <Legend />
        <Bar dataKey="value">
          {data.map((_, index) => (
            <Cell key={index} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
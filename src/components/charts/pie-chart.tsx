import { PieChart as RechartsPieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface PieChartProps {
  data: Array<{ name: string; value: number }>;
  colors: string[];
}

export function PieChartComponent({ data, colors }: PieChartProps) {
  return (
    <ResponsiveContainer>
      <RechartsPieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((_, index) => (
            <Cell key={index} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }} />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
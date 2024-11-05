import { XAxis, YAxis } from 'recharts';

interface AxisProps {
  dataKey?: string;
}

export function SharedXAxis({ dataKey = 'name' }: AxisProps) {
  return (
    <XAxis
      dataKey={dataKey}
      tick={{ fill: 'currentColor' }}
      stroke="currentColor"
      padding={{ left: 0, right: 0 }}
      allowDataOverflow={false}
      allowDecimals={true}
      allowDuplicatedCategory={true}
      hide={false}
      mirror={false}
      reversed={false}
      xAxisId={0}
    />
  );
}

export function SharedYAxis({ dataKey = 'value' }: AxisProps) {
  return (
    <YAxis
      dataKey={dataKey}
      tick={{ fill: 'currentColor' }}
      stroke="currentColor"
      padding={{ top: 0, bottom: 0 }}
      allowDataOverflow={false}
      allowDecimals={true}
      allowDuplicatedCategory={true}
      hide={false}
      mirror={false}
      reversed={false}
      yAxisId={0}
    />
  );
}
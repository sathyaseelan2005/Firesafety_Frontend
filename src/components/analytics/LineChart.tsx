import type { ChartData } from '../../types/analytics';

interface LineChartProps {
  data: ChartData;
  title?: string;
  className?: string;
}

export function LineChart({ data, title, className = '' }: LineChartProps) {
  const max = Math.max(...data.values, 1);
  const min = Math.min(...data.values, 0);
  const range = max - min || 1;
  const points = data.values
    .map((v, i) => {
      const x = (i / (data.values.length - 1 || 1)) * 100;
      const y = 100 - ((v - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className={`bg-theme-surface rounded-lg border border-theme-surface-hover p-6 ${className}`}>
      {title && <h3 className="text-lg font-semibold text-theme-text mb-4">{title}</h3>}
      <div className="h-48 relative">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-theme-accent"
            points={points}
          />
        </svg>
      </div>
      <div className="flex justify-between mt-2 text-xs text-theme-text-muted">
        {data.labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}

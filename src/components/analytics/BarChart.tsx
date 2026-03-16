import type { ChartData } from '../../types/analytics';

interface BarChartProps {
  data: ChartData;
  title?: string;
  className?: string;
}

export function BarChart({ data, title, className = '' }: BarChartProps) {
  const max = Math.max(...data.values, 1);

  return (
    <div className={`bg-theme-surface rounded-lg border border-theme-surface-hover p-6 ${className}`}>
      {title && <h3 className="text-lg font-semibold text-theme-text mb-4">{title}</h3>}
      <div className="space-y-3">
        {data.labels.map((label, i) => (
          <div key={label} className="flex items-center gap-3">
            <span className="w-32 text-sm text-theme-text-muted truncate shrink-0">{label}</span>
            <div className="flex-1 h-6 bg-theme-bg rounded overflow-hidden">
              <div
                className="h-full bg-theme-accent/80 rounded transition-all duration-500"
                style={{ width: `${(data.values[i] / max) * 100}%` }}
              />
            </div>
            <span className="w-10 text-sm font-medium text-theme-text text-right shrink-0">
              {data.values[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

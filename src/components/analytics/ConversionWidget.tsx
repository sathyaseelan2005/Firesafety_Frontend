import { TrendingUp } from 'lucide-react';

interface ConversionWidgetProps {
  rate: number;
  totalViews: number;
  totalEnquiries: number;
  className?: string;
}

export function ConversionWidget({ rate, totalViews, totalEnquiries, className = '' }: ConversionWidgetProps) {
  return (
    <div
      className={`bg-theme-surface rounded-lg border border-theme-surface-hover p-6 flex flex-col items-center justify-center ${className}`}
    >
      <div className="flex items-center gap-2 text-theme-accent mb-2">
        <TrendingUp className="w-8 h-8" />
        <span className="text-3xl font-bold text-theme-text">{rate}%</span>
      </div>
      <p className="text-sm font-medium text-theme-text-muted uppercase tracking-wider">Conversion Rate</p>
      <p className="text-xs text-theme-text-muted mt-2">
        {totalEnquiries} enquiries / {totalViews} views
      </p>
    </div>
  );
}

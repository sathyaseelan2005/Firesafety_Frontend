import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  className?: string;
}

export function StatCard({ title, value, icon, className = '' }: StatCardProps) {
  return (
    <div
      className={`bg-theme-surface rounded-lg border border-theme-surface-hover p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-theme-text-muted uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-theme-text mt-1">{value}</p>
        </div>
        {icon && <div className="text-theme-accent opacity-80">{icon}</div>}
      </div>
    </div>
  );
}

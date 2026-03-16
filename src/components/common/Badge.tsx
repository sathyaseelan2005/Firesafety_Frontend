import { ReactNode } from 'react';

interface BadgeProps {
  variant?: 'active' | 'inactive' | 'neutral' | 'accent';
  children: ReactNode;
  className?: string;
}

const variantClasses = {
  active: 'bg-green-100 text-green-800 border-green-200',
  inactive: 'bg-gray-100 text-gray-600 border-gray-200',
  neutral: 'bg-theme-surface-hover text-theme-text-muted border-theme-surface-hover',
  accent: 'bg-theme-accent/10 text-theme-accent border-theme-accent/30',
};

export function Badge({ variant = 'neutral', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

/** Analytics types for dashboard and charts. */

export interface AnalyticsMetric {
  label: string;
  value: number;
  unit?: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface ChartData {
  labels: string[];
  values: number[];
}

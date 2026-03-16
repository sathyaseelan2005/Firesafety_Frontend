import type { ChartData } from '../types/analytics';

/** Seed data for charts. Real values come from AnalyticsContext (local counters). */
export const categoryDemandMock: ChartData = {
  labels: ['Fire Extinguishers', 'Safety Gloves', 'Helmets & PPE', 'Fire Blankets', 'Safety Footwear'],
  values: [120, 85, 60, 45, 30],
};

export const monthlyTrendMock: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  values: [40, 55, 48, 72, 65, 80],
};

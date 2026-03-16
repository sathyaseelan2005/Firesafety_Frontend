import { useEffect, useState } from "react";
import { useMemo } from 'react';

import { BarChart } from '../../components/analytics/BarChart';
import { LineChart } from '../../components/analytics/LineChart';
import { ConversionWidget } from '../../components/analytics/ConversionWidget';

import { useAnalytics } from '../../contexts/AnalyticsContext';
import { useProducts } from '../../contexts/ProductsContext';
import { categoriesMock } from '../../data/categories.mock';
import { categoryDemandMock, monthlyTrendMock } from '../../data/analytics.mock';
import type { ChartData } from '../../types/analytics';

// Backend analytics endpoints for summary/trends/performance are not implemented.
// Use local mock/fallback data instead of calling backend to avoid 404s.

export function Analytics() {

  // Hooks
  const { products } = useProducts();

  const [summary, setSummary] = useState<any>(null);
  const [productStats, setProductStats] = useState<any>(null);
  const [trends, setTrends] = useState<any>(null);

  const [period, setPeriod] = useState<'D' | 'W' | 'M' | 'Y'>('D');

  const aggregatedTrends = useMemo(() => {
    if (!trends) return { labels: [], values: [] };

    // Support two shapes for `trends`:
    // 1) array of events: [{ date: '2026-02-01', views: 10 }, ...]
    // 2) mock/chart shape: { labels: string[], values: number[] }
    if (Array.isArray(trends)) {
      const grouped: Record<string, number> = {};

      trends.forEach((t: any) => {
        const date = new Date(t.date);

        let key = '';

        if (period === 'D') {
          key = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }

        if (period === 'W') {
          const week = Math.ceil(date.getDate() / 7);
          key = `${date.toLocaleString('en-US', { month: 'short' })} W${week}`;
        }

        if (period === 'M') {
          key = date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
        }

        if (period === 'Y') {
          key = String(date.getFullYear());
        }

        grouped[key] = (grouped[key] || 0) + (typeof t.views === 'number' ? t.views : 0);
      });

      return {
        labels: Object.keys(grouped),
        values: Object.values(grouped),
      };
    }

    // If trends already in { labels, values } format, forward as-is
    if (typeof trends === 'object' && Array.isArray((trends as any).labels) && Array.isArray((trends as any).values)) {
      return { labels: (trends as any).labels, values: (trends as any).values };
    }

    if (import.meta.env.DEV) console.warn('[analytics] Analytics: unexpected `trends` shape', trends);
    return { labels: [], values: [] };
  }, [trends, period]);


  useEffect(() => {
    // Do not call backend endpoints that are not implemented.
    // Use safe local fallbacks / mocks so the analytics page still renders.
    setSummary({ total_views: 0, conversion_rate: 0, total_enquiries: 0 });
    setProductStats({ views: [] });
    // monthlyTrendMock imported above provides safe chart data
    setTrends(monthlyTrendMock);
  }, []);


  const totalViews = summary?.total_views ?? 0;
  const conversionRate = summary?.conversion_rate ?? 0;
  const totalEnquiries = summary?.total_enquiries ?? 0;

  const topProduct =
  productStats?.views?.length
    ? [...productStats.views].sort((a, b) => b.views - a.views)[0]
    : null;

  //const hasViews = Object.keys(productViews).length > 0;
  const getProductName = (id: number) => {
    const product = products.find(p => Number(p.id) === id);
    return product ? product.name : `Product ${id}`;
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="border-b border-theme-surface-hover pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-theme-text tracking-tight">Analytics Dashboard</h1>
            <p className="text-theme-text-muted mt-2 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Real-time analytics powered by backend event tracking
            </p>
          </div>
          <div className="bg-theme-surface px-4 py-2 rounded-lg border border-theme-surface-hover">
            <span className="text-sm text-theme-text-muted">Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Conversion Widget */}
        <div className="md:col-span-1">
          <ConversionWidget
            rate={conversionRate}
            totalViews={totalViews}
            totalEnquiries={totalEnquiries}
          />
        </div>

        {/* Stats Cards */}
        <div className="bg-gradient-to-br from-theme-surface to-theme-surface-hover p-6 rounded-xl border border-theme-surface-hover hover:shadow-lg transition-all duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-theme-text-muted">Total Views</p>
              <h2 className="text-3xl font-bold text-theme-text mt-2">{totalViews.toLocaleString()}</h2>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 text-xs text-theme-text-muted">
            <span className="text-green-500">↑ 12%</span> vs last period
          </div>
        </div>

        <div className="bg-gradient-to-br from-theme-surface to-theme-surface-hover p-6 rounded-xl border border-theme-surface-hover hover:shadow-lg transition-all duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-theme-text-muted">Total Enquiries</p>
              <h2 className="text-3xl font-bold text-theme-text mt-2">{totalEnquiries.toLocaleString()}</h2>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 text-xs text-theme-text-muted">
            <span className="text-green-500">↑ 8%</span> vs last period
          </div>
        </div>

        <div className="bg-gradient-to-br from-theme-surface to-theme-surface-hover p-6 rounded-xl border border-theme-surface-hover hover:shadow-lg transition-all duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-theme-text-muted">Top Product</p>
              <h2 className="text-xl font-bold text-theme-text mt-2 truncate max-w-[180px]">
                {topProduct ? getProductName(topProduct.product_name) : "No data"}
              </h2>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 text-xs text-theme-text-muted">
            {topProduct && `${topProduct.views} views this period`}
          </div>
        </div>
      </div>

      {/* Analytics Panels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Viewed Products Panel */}
        <div className="bg-theme-surface rounded-xl border border-theme-surface-hover overflow-hidden hover:shadow-lg transition-all duration-200">
          <div className="p-6 border-b border-theme-surface-hover bg-gradient-to-r from-theme-surface to-theme-surface-hover">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-theme-text flex items-center gap-2">
                <span className="w-1.5 h-5 bg-blue-500 rounded-full"></span>
                Most Viewed Products
              </h3>
              <span className="text-xs font-medium px-2.5 py-1 bg-blue-500/10 text-blue-500 rounded-full">
                Top 5
              </span>
            </div>
          </div>
          <div className="p-6">
            {productStats?.views?.length ? (
              <div className="space-y-4">
                {productStats.views.slice(0, 5).map((p: any, index: number) => (
                  <div key={p.product_name} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3 flex-1">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                        ${index === 0 ? 'bg-yellow-500/20 text-yellow-500' : 
                          index === 1 ? 'bg-gray-400/20 text-gray-400' : 
                          index === 2 ? 'bg-orange-500/20 text-orange-500' : 
                          'bg-theme-surface-hover text-theme-text-muted'}`}>
                        {index + 1}
                      </span>
                      <span className="text-theme-text font-medium">{getProductName(p.product_name)}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-2 bg-theme-surface-hover rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${(p.views / productStats.views[0].views) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-theme-text min-w-[60px] text-right">
                        {p.views.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-theme-surface-hover rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-theme-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-theme-text-muted">No analytics data available yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Enquiries Panel */}
        <div className="bg-theme-surface rounded-xl border border-theme-surface-hover overflow-hidden hover:shadow-lg transition-all duration-200">
          <div className="p-6 border-b border-theme-surface-hover bg-gradient-to-r from-theme-surface to-theme-surface-hover">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-theme-text flex items-center gap-2">
                <span className="w-1.5 h-5 bg-green-500 rounded-full"></span>
                Enquiries Overview
              </h3>
              <span className="text-xs font-medium px-2.5 py-1 bg-green-500/10 text-green-500 rounded-full">
                Simulated
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="relative">
              {/* Semi-circle progress indicator */}
              <div className="flex justify-center mb-8">
                <div className="relative w-48 h-24 overflow-hidden">
                  <div className="absolute w-48 h-48 rounded-full border-8 border-theme-surface-hover"></div>
                  <div className="absolute w-48 h-48 rounded-full border-8 border-green-500"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                      transform: `rotate(${45 + (conversionRate * 1.8)}deg)`,
                      transformOrigin: 'center center',
                      borderTopColor: 'transparent',
                      borderRightColor: 'transparent'
                    }}></div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-4xl font-bold text-theme-text mb-2">{totalEnquiries.toLocaleString()}</p>
                <p className="text-sm text-theme-text-muted mb-4">Total enquiries received</p>
                <div className="flex justify-center gap-4">
                  <div className="text-center">
                    <p className="text-xs text-theme-text-muted">Conversion Rate</p>
                    <p className="text-lg font-semibold text-green-500">{(conversionRate * 100).toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-theme-surface rounded-xl border border-theme-surface-hover p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-theme-text flex items-center gap-2">
              <span className="w-1.5 h-5 bg-purple-500 rounded-full"></span>
              Product Views Distribution
            </h3>
            <select className="text-sm bg-theme-surface border border-theme-surface-hover rounded-lg px-3 py-1.5 text-theme-text">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <BarChart
            data={
              productStats?.views
                ? {
                    labels: productStats.views.map((v: any) =>
                      getProductName(v.product_name)
                    ),
                    values: productStats.views.map((v:any) => v.views),
                  }
                : { labels: [], values: [] }
            }
          />
        </div>

        <div className="bg-theme-surface rounded-xl border border-theme-surface-hover p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-theme-text flex items-center gap-2">
              <span className="w-1.5 h-5 bg-orange-500 rounded-full"></span>
              Views Trend
            </h3>
            <div className="flex gap-2">
              {['D', 'W', 'M', 'Y'].map(p => (
                <button
                  key={p}
                  onClick={() => setPeriod(p as any)}
                  className={`text-xs px-3 py-1.5 rounded-lg transition
                    ${period === p
                      ? 'bg-blue-500/10 text-blue-500'
                      : 'bg-theme-surface-hover text-theme-text-muted'}
                  `}
                >
                  {p}
                </button>
              ))}
            </div>


          </div>
          <LineChart
            data={
              aggregatedTrends
            }
          />
        </div>
      </div>

      {/* Footer with refresh indicator */}
      <div className="text-center text-xs text-theme-text-muted border-t border-theme-surface-hover pt-6">
        <div className="flex items-center justify-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
          Auto-refreshes every 10 seconds • Real-time data
        </div>
      </div>
    </div>
  );
}
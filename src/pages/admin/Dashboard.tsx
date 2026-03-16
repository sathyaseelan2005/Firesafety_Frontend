import { Link } from 'react-router-dom';
import { Package, Eye, MessageCircle, TrendingUp, ArrowUpRight, Clock } from 'lucide-react';
import { StatCard } from '../../components/analytics/StatCard';
import { useAnalytics } from '../../contexts/AnalyticsContext';
import { useProducts } from '../../contexts/ProductsContext';
import { getAnalyticsSummary } from '../../services/analyticsApi'
import { useEffect, useState } from 'react';

export function Dashboard() {
  const [summary, setSummary] = useState<any>(null)
  useEffect(() => {
  async function loadAnalytics() {
    const data = await getAnalyticsSummary()
    setSummary(data)
  }

  loadAnalytics()
}, [])
  const { products } = useProducts();
  const totalProducts = products.length;
  const totalViews = summary?.total_views ?? 0
const totalEnquiries = summary?.enquiry_clicks ?? 0
const conversionRate = summary?.conversion_rate ?? 0


  // Get current time for greeting
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-8">
      {/* Header Section with Welcome Message */}
      <div className="border-b border-theme-surface-hover pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-theme-text tracking-tight">Dashboard</h1>
            <p className="text-theme-text-muted mt-2 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
              {greeting}! Here's what's happening with your products today
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-theme-surface px-4 py-2 rounded-xl border border-theme-surface-hover flex items-center gap-2">
              <Clock className="w-4 h-4 text-theme-text-muted" />
              <span className="text-sm text-theme-text-muted">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 rounded-xl border border-theme-surface-hover">
              <span className="text-sm font-medium text-theme-text">Using real time data</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Products" 
          value={totalProducts} 
          icon={<Package className="w-8 h-8" />}
        />
        <StatCard 
          title="Total Views" 
          value={totalViews.toLocaleString()} 
          icon={<Eye className="w-8 h-8" />}
        />
        <StatCard 
          title="Total Enquiries" 
          value={totalEnquiries.toLocaleString()} 
          icon={<MessageCircle className="w-8 h-8" />}
        />
        
      </div>

      {/* Quick Actions and Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Links Card */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-theme-surface to-theme-surface-hover rounded-xl border border-theme-surface-hover p-6 hover:shadow-lg transition-all duration-200 h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-blue-500/10 rounded-xl">
                <Package className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="text-lg font-semibold text-theme-text">Quick Actions</h2>
            </div>
            
            <div className="space-y-3">
              <Link 
                to="/admin/products" 
                className="flex items-center justify-between p-4 bg-theme-surface rounded-xl border border-theme-surface-hover hover:border-blue-500/30 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-theme-surface-hover rounded-lg group-hover:bg-blue-500/10 transition-colors">
                    <Package className="w-4 h-4 text-theme-text-muted group-hover:text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium text-theme-text">Manage products</p>
                    <p className="text-xs text-theme-text-muted mt-0.5">Edit, add or remove products</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-theme-text-muted group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>

              <Link 
                to="/admin/analytics" 
                className="flex items-center justify-between p-4 bg-theme-surface rounded-xl border border-theme-surface-hover hover:border-purple-500/30 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-theme-surface-hover rounded-lg group-hover:bg-purple-500/10 transition-colors">
                    <TrendingUp className="w-4 h-4 text-theme-text-muted group-hover:text-purple-500" />
                  </div>
                  <div>
                    <p className="font-medium text-theme-text">View analytics</p>
                    <p className="text-xs text-theme-text-muted mt-0.5">Track performance and insights</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-theme-text-muted group-hover:text-purple-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>
            </div>

            {/* Quick Stats Mini Card */}
            <div className="mt-6 pt-6 border-t border-theme-surface-hover">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-theme-surface-hover/50 rounded-lg">
                  <p className="text-xs text-theme-text-muted">Products</p>
                  <p className="text-lg font-bold text-theme-text">{totalProducts}</p>
                </div>
                <div className="text-center p-3 bg-theme-surface-hover/50 rounded-lg">
                  <p className="text-xs text-theme-text-muted">Conversion</p>
                  <p className="text-lg font-bold text-green-500">{conversionRate}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Preview Card */}
        <div className="lg:col-span-2">
          <div className="bg-theme-surface rounded-xl border border-theme-surface-hover p-6 hover:shadow-lg transition-all duration-200 h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-green-500/10 rounded-xl">
                  <Clock className="w-5 h-5 text-green-500" />
                </div>
                <h2 className="text-lg font-semibold text-theme-text">Recent Activity</h2>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 bg-green-500/10 text-green-500 rounded-full">
                Live
              </span>
            </div>

            <div className="space-y-4">
              {/* Activity Items */}
              <div className="flex items-center gap-4 p-3 bg-theme-surface-hover/30 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Eye className="w-4 h-4 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-theme-text">
                    <span className="font-medium">{totalViews.toLocaleString()}</span> total product views
                  </p>
                  <p className="text-xs text-theme-text-muted mt-1">Across all products</p>
                </div>
                <span className="text-xs text-theme-text-muted">Just now</span>
              </div>

              <div className="flex items-center gap-4 p-3 bg-theme-surface-hover/30 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-theme-text">
                    <span className="font-medium">{totalEnquiries.toLocaleString()}</span> enquiries received
                  </p>
                  <p className="text-xs text-theme-text-muted mt-1">{conversionRate}% conversion rate</p>
                </div>
                <span className="text-xs text-theme-text-muted">2 min ago</span>
              </div>

              {products.slice(0, 2).map((product, index) => (
                <div key={product.id} className="flex items-center gap-4 p-3 bg-theme-surface-hover/30 rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Package className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-theme-text font-medium">{product.name}</p>
                    <p className="text-xs text-theme-text-muted mt-1">Product {index === 0 ? 'updated' : 'added'}</p>
                  </div>
                  <span className="text-xs text-theme-text-muted">{index === 0 ? '1 hour ago' : '3 hours ago'}</span>
                </div>
              ))}
            </div>

            {/* View All Link */}
            <div className="mt-6 text-center">
              <button className="text-sm text-theme-text-muted hover:text-theme-accent transition-colors">
                View all activity →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="text-center text-xs text-theme-text-muted border-t border-theme-surface-hover pt-6">
        <div className="flex items-center justify-center gap-4">
          <span>Total products: {totalProducts}</span>
          <span>•</span>
          <span>Total views: {totalViews.toLocaleString()}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500"></span>
            Using Real-Time Data
          </span>
        </div>
      </div>
    </div>
  );
}
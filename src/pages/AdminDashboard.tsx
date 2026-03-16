import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Eye, MessageSquare } from 'lucide-react';
import { toolsApi, enquiriesApi } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { AddToolPage } from './AddToolPage';
import type { Tool, Enquiry, ToolWithDetails } from '../lib/database.types';
import { getImageUrl } from '../lib/supabase';
import { useAnalytics } from '../contexts/AnalyticsContext';
import { API_BASE } from '../config';

import BlurText from '../components/BlurText';

interface AdminDashboardProps {
  onViewTool: (toolId: string) => void;
}

export const AdminDashboard = ({ onViewTool }: AdminDashboardProps) => {
  const { productViews, enquiryClicks, getTotalViews, getConversionRate } = useAnalytics();
  const { owner } = useAuth();
  const [tools, setTools] = useState<ToolWithDetails[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [editingTool, setEditingTool] = useState<Tool | undefined>();
  const [activeTab, setActiveTab] = useState<'tools' | 'enquiries'>('tools');

  


  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  useEffect(() => {
    if (owner) {
      loadData();
    }
  }, [owner]);

  const loadData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('admin_token');
      const [allTools, allEnquiries] = await Promise.all([
        toolsApi.getAll(),
        token ? enquiriesApi.getAll(token) : Promise.resolve([]),
      ]);

      const myTools = allTools.filter((t: Tool) => t.owner_id === owner?.id);
      const myEnquiries = allEnquiries.filter((e: Enquiry) =>
        myTools.some((t: Tool) => t.id === e.tool_id)
      );

      setTools(myTools);
      setEnquiries(myEnquiries);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTool = async (toolId: string) => {
    if (!confirm('Are you sure you want to delete this tool?')) return;

    try {
      const token = localStorage.getItem('admin_token');
      if (!token) throw new Error('No admin token found');
      await toolsApi.delete(toolId, token);
      await loadData();
    } catch (err) {
      console.error('Failed to delete tool:', err);
      alert('Failed to delete tool');
    }
  };

  const handleEditTool = (tool: Tool) => {
    setEditingTool(tool);
    setView('edit');
  };

  const handleAddTool = () => {
    setEditingTool(undefined);
    setView('add');
  };

  const handleCloseForm = () => {
    setView('list');
    setEditingTool(undefined);
  };

  const handleSaveTool = () => {
    loadData();
  };

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'new').length;

  // Use local analytics context values only; backend summary endpoint not available.

  if (loading) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-bg py-8">
      {view !== 'list' ? (
        <AddToolPage
          initialTool={editingTool}
          onBack={handleCloseForm}
          onSave={handleSaveTool}
        />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <BlurText
              text="Admin Dashboard"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-3xl font-bold text-theme-text mb-2"
            />
            <p className="text-theme-text-muted">
              Welcome back, {owner?.company_name}
            </p>
            <div className="grid grid-cols-3 gap-4 mt-6 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-sm text-gray-500">Total Product Views</p>
                <p className="text-2xl font-bold">{getTotalViews()}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-sm text-gray-500">Enquiry Clicks</p>
                <p className="text-2xl font-bold">{enquiryClicks}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-sm text-gray-500">Conversion Rate</p>
                <p className="text-2xl font-bold">{getConversionRate()}%</p>
              </div>
            </div>
          </div>


          <div className="bg-theme-surface rounded-lg shadow-sm border border-theme-surface-hover mb-6">
            <div className="flex border-b border-theme-surface-hover">
              <button
                onClick={() => setActiveTab('tools')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'tools'
                  ? 'text-theme-accent border-b-2 border-theme-accent'
                  : 'text-theme-text-muted hover:text-theme-text'
                  }`}
              >
                My Tools ({tools.length})
              </button>
              <button
                onClick={() => setActiveTab('enquiries')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors relative ${activeTab === 'enquiries'
                  ? 'text-theme-accent border-b-2 border-theme-accent'
                  : 'text-theme-text-muted hover:text-theme-text'
                  }`}
              >
                Enquiries ({enquiries.length})
                {newEnquiriesCount > 0 && (
                  <span className="absolute top-3 right-4 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-theme-accent rounded-full">
                    {newEnquiriesCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {activeTab === 'tools' ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-theme-text">
                  Your Tools
                </h2>
                <button
                  onClick={handleAddTool}
                  className="flex items-center gap-2 px-4 py-2 bg-theme-accent text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg shadow-theme-accent/20"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add New Tool</span>
                </button>
              </div>

              {tools.length === 0 ? (
                <div className="bg-theme-surface rounded-lg shadow-sm border border-theme-surface-hover p-12 text-center">
                  <p className="text-theme-text-muted mb-4">
                    You haven't added any tools yet
                  </p>
                  <button
                    onClick={handleAddTool}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-theme-accent text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Your First Tool</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tools.map((tool) => (
                    <div
                      key={tool.id}
                      className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-[4/3] bg-gray-100 relative group">
                        <img
                          src={
                            tool.images?.[0]
                              ? getImageUrl(tool.images[0])
                              : 'https://images.pexels.com/photos/1161682/pexels-photo-1161682.jpeg?auto=compress&cs=tinysrgb&w=400'
                          }
                          alt={tool.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 truncate text-lg">
                          {tool.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-4">
                          <span
                            className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${tool.is_active
                              ? 'bg-green-100 text-green-800 border border-green-200'
                              : 'bg-gray-100 text-gray-600 border border-gray-200'
                              }`}
                          >
                            {tool.is_active ? 'Active' : 'Inactive'}
                          </span>
                          {tool.category && (
                            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                              {typeof tool.category === 'string' ? tool.category : (tool.category as any).name}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => onViewTool(tool.id)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm border border-gray-300 font-medium"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View</span>
                          </button>
                          <button
                            onClick={() => handleEditTool(tool)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white text-amber-600 rounded-md hover:bg-amber-50 transition-colors text-sm border border-amber-200 font-medium"
                          >
                            <Edit2 className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteTool(tool.id)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white text-red-600 rounded-md hover:bg-red-50 transition-colors text-sm border border-red-200 font-medium"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-theme-text mb-6">
                Customer Enquiries
              </h2>

              {enquiries.length === 0 ? (
                <div className="bg-theme-surface rounded-lg shadow-sm border border-theme-surface-hover p-12 text-center">
                  <MessageSquare className="w-12 h-12 text-theme-text-muted mx-auto mb-4" />
                  <p className="text-theme-text-muted">No enquiries yet</p>
                </div>
              ) : (
                <div className="bg-theme-surface rounded-lg shadow-sm border border-theme-surface-hover divide-y divide-theme-surface-hover">
                  {enquiries.map((enquiry) => {
                    const tool = tools.find((t) => t.id === enquiry.tool_id);
                    return (
                      <div key={enquiry.id} className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-theme-text">
                              {enquiry.name}
                            </h3>
                            <p className="text-sm text-theme-text-muted">
                              {enquiry.email}
                              {enquiry.phone && ` • ${enquiry.phone}`}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${enquiry.status === 'new'
                              ? 'bg-blue-900/30 text-blue-400 border border-blue-900/50'
                              : enquiry.status === 'read'
                                ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-900/50'
                                : 'bg-green-900/30 text-green-400 border border-green-900/50'
                              }`}
                          >
                            {enquiry.status}
                          </span>
                        </div>
                        <p className="text-sm text-theme-text-muted mb-3 bg-theme-bg p-3 rounded border border-theme-surface-hover">
                          {enquiry.message}
                        </p>
                        <div className="text-xs text-theme-text-muted">
                          <span className="font-medium">Regarding:</span> {tool?.name}
                          {' • '}
                          {new Date(enquiry.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

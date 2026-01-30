import { useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { ToolCard } from '../components/ToolCard';
import { CustomSelect } from '../components/CustomSelect';
import { toolsApi, categoriesApi } from '../services/api';
import type { ToolWithDetails, Category } from '../lib/database.types';

interface ToolsListProps {
  onToolClick: (toolId: string) => void;
}

export const ToolsList = ({ onToolClick }: ToolsListProps) => {
  const [tools, setTools] = useState<ToolWithDetails[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [selectedCategory]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [toolsData, categoriesData] = await Promise.all([
        toolsApi.getAll(selectedCategory),
        categoriesApi.getAll(),
      ]);
      setTools(toolsData);
      setCategories(categoriesData);
      setError(null);
    } catch (err) {
      setError('Failed to load tools');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-theme-bg">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-theme-surface rounded-lg shadow-sm border border-theme-surface-hover p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-text-muted w-5 h-5" />
              <input
                type="text"
                placeholder="Search tools by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-theme-bg border border-theme-surface-hover rounded-lg text-theme-text focus:outline-none focus:ring-2 focus:ring-theme-accent focus:border-transparent placeholder-theme-text-muted"
              />
            </div>

            <div className="relative min-w-[200px] flex-1">
              <CustomSelect
                value={selectedCategory}
                onChange={setSelectedCategory}
                options={[
                  { value: '', label: 'All Categories' },
                  ...categories.map(cat => ({ value: cat.slug, label: cat.name }))
                ]}
                placeholder="All Categories"
                icon={<Filter className="text-theme-text-muted w-5 h-5" />}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-accent"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-theme-accent text-lg">{error}</p>
            <button
              onClick={loadData}
              className="mt-4 px-6 py-2 bg-theme-accent text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg shadow-theme-accent/20"
            >
              Try Again
            </button>
          </div>
        ) : filteredTools.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No tools found</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-theme-text-muted">
              Showing {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  onClick={() => onToolClick(tool.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

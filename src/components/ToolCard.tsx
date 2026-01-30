import { Star, ShoppingCart } from 'lucide-react';
import type { ToolWithDetails } from '../lib/database.types';
import { getImageUrl } from '../lib/supabase';

interface ToolCardProps {
  tool: ToolWithDetails;
  onClick: () => void;
}

export const ToolCard = ({ tool, onClick }: ToolCardProps) => {
  const imageUrl = tool.images?.[0]
    ? getImageUrl(tool.images[0])
    : 'https://images.pexels.com/photos/1161682/pexels-photo-1161682.jpeg?auto=compress&cs=tinysrgb&w=800';

  // Calculate discount if MRP exists
  // Calculate discount if MRP exists (Unused now but kept logic if needed later, or removed to clear lint)
  // const discountPercentage = tool.mrp ? Math.round(((tool.mrp - tool.price) / tool.mrp) * 100) : 0;
  const rating = tool.rating || 5;
  const brandName = (tool.owner as any)?.companyName || tool.owner?.company_name || 'Brand';

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer flex flex-col bg-theme-surface rounded-xl overflow-hidden border border-theme-surface-hover hover:border-theme-accent transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={tool.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.pexels.com/photos/1161682/pexels-photo-1161682.jpeg?auto=compress&cs=tinysrgb&w=800';
          }}
        />

        {/* Bestseller Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-theme-accent text-[10px] font-bold px-2.5 py-1 rounded-[4px] uppercase tracking-wider shadow-sm border border-theme-surface-hover">
            Best Seller
          </span>
        </div>

        {/* Quick Add Button Overlay */}
        <div className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button className="bg-theme-accent text-white p-3 rounded-full hover:bg-black transition-colors shadow-lg">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-theme-text-muted font-bold text-xs uppercase tracking-widest truncate max-w-[70%]">
              {brandName}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded text-xs">
              <span className="text-theme-text font-medium">{rating}</span>
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
            </div>
          </div>

          <h2 className="text-theme-text text-sm font-bold leading-snug line-clamp-2 mb-3 min-h-[40px]">
            {tool.name}
          </h2>
        </div>

        {/* Price Block */}
        {/* Price Block Removed */}
      </div>
    </div>
  );
};

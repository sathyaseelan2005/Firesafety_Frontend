import type { ProductWithCategory } from '../../types/product';
import { Badge } from '../common/Badge';
import { useAnalytics } from '../../contexts/AnalyticsContext';
import { recordProductView as recordProductViewAPI } from '../../services/analyticsApi'

interface ProductCardProps {
  product: ProductWithCategory;
  onClick: () => void;
}

const defaultImage =
  'https://images.pexels.com/photos/1161682/pexels-photo-1161682.jpeg?auto=compress&cs=tinysrgb&w=800';

export function ProductCard({ product, onClick }: ProductCardProps) {

  const { recordProductView } = useAnalytics();

  const imageUrl = product.image_url ?? defaultImage;
  const categoryName = product.category?.name ?? 'Product';

  const handleClick = () => {
    // update local analytics
    recordProductView(product.id)

    // send to backend
    try {
      recordProductViewAPI(product.id)
    } catch (err) {
      console.warn("Analytics API failed")
    }

    // navigate
    onClick()
  }

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleClick()
      }}
      className="group relative cursor-pointer flex flex-col bg-theme-surface rounded-xl overflow-hidden border border-theme-surface-hover hover:border-theme-accent transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultImage;
          }}
        />

        <div className="absolute top-3 left-3">
          <Badge variant={product.is_active ? 'active' : 'inactive'}>
            {product.is_active ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <p className="text-theme-text-muted font-bold text-xs uppercase tracking-widest mb-1 truncate">
          {categoryName}
        </p>

        <h2 className="text-theme-text text-sm font-bold leading-snug line-clamp-2 min-h-[40px]">
          {product.name}
        </h2>

        <p className="text-xs text-theme-text-muted mt-1">
          SKU: {product.sku}
        </p>
      </div>
    </div>
  )
}
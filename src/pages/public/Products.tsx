import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";

import { ProductCard } from "../../components/product/ProductCard";
import { CustomSelect } from "../../components/CustomSelect";
import { categoriesMock } from "../../data/categories.mock";
import { getProducts } from "../../services/productsApi";

export function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filtered = useMemo(() => {
    let list = products;

    if (selectedCategoryId) {
      list = list.filter((p) => p.category === selectedCategoryId);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
      );
    }

    return list;
  }, [products, selectedCategoryId, searchQuery]);

  const categoryOptions = [
    { value: "", label: "All Categories" },
    ...categoriesMock.map((c) => ({ value: c.id, label: c.name })),
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-theme-text-muted">
        Loading products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-theme-surface rounded-lg shadow-sm border border-theme-surface-hover p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">

            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-text-muted w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, SKU or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-theme-bg border border-theme-surface-hover rounded-lg"
              />
            </div>

            <div className="min-w-[200px]">
              <CustomSelect
                value={selectedCategoryId}
                onChange={setSelectedCategoryId}
                options={categoryOptions}
                placeholder="All Categories"
                icon={<Filter className="text-theme-text-muted w-5 h-5" />}
              />
            </div>

          </div>
        </div>

        <p className="text-theme-text-muted mb-6">
          Showing {filtered.length} products
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-theme-text-muted">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => navigate(`/products/${product.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
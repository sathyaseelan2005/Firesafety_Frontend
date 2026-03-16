import { useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit2, Eye, ToggleLeft, ToggleRight } from "lucide-react";

import { Badge } from "../../components/common/Badge";
import { categoriesMock } from "../../data/categories.mock";

import { getProducts, updateProduct } from "../../services/productsApi";

interface Product {
  id: number;
  name: string;
  sku: string;
  category: number;
  description?: string;
  image_url?: string;
  is_active: boolean;
}

export function ProductsList() {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (product: Product) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await updateProduct(
        product.id,
        {
          is_active: !product.is_active
        },
        token
      );

      loadProducts();
    } catch (err) {
      console.error("Toggle failed", err);
    }
  };

  const byCategory = useMemo(() => {
    const map: Record<number, string> = {};

    categoriesMock.forEach((c) => {
      map[Number(c.id)] = c.name;
    });

    return map;
  }, []);

  if (loading) {
    return (
      <div className="text-theme-text-muted">
        Loading products...
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-theme-text">
            Product Management
          </h1>
          <p className="text-theme-text-muted text-sm">
            Manage product visibility and details
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="px-4 py-2 bg-theme-accent text-white rounded-lg hover:bg-red-600 transition"
        >
          Add Product
        </Link>
      </div>

      <p className="text-theme-text-muted mb-8">
        Manage product visibility and details
      </p>

      <div className="bg-theme-surface rounded-lg border border-theme-surface-hover overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="bg-theme-bg border-b border-theme-surface-hover">

              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-theme-text">
                  Product
                </th>

                <th className="px-4 py-3 text-sm font-semibold text-theme-text">
                  SKU
                </th>

                <th className="px-4 py-3 text-sm font-semibold text-theme-text">
                  Category
                </th>

                <th className="px-4 py-3 text-sm font-semibold text-theme-text">
                  Status
                </th>

                <th className="px-4 py-3 text-sm font-semibold text-theme-text">
                  Actions
                </th>
              </tr>

            </thead>

            <tbody className="divide-y divide-theme-surface-hover">

              {products.map((p) => (

                <tr key={p.id} className="hover:bg-theme-bg/50">

                  <td className="px-4 py-3">
                    <span className="font-medium text-theme-text">
                      {p.name}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-theme-text-muted text-sm">
                    {p.sku}
                  </td>

                  <td className="px-4 py-3 text-theme-text-muted text-sm">
                    {byCategory[p.category] ?? p.category}
                  </td>

                  <td className="px-4 py-3">
                    <Badge variant={p.is_active ? "active" : "inactive"}>
                      {p.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </td>

                  <td className="px-4 py-3 flex items-center gap-2">

                    <button
                      type="button"
                      onClick={() => toggleActive(p)}
                      className="p-2 text-theme-text-muted hover:text-theme-text"
                      title={p.is_active ? "Set inactive" : "Set active"}
                    >
                      {p.is_active ? (
                        <ToggleRight className="w-5 h-5 text-green-600" />
                      ) : (
                        <ToggleLeft className="w-5 h-5" />
                      )}
                    </button>

                    <Link
                      to={`/products/${p.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-theme-text-muted hover:text-theme-accent"
                      title="View on site"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>

                    <Link
                      to={`/admin/products/${p.id}/edit`}
                      className="p-2 text-theme-text-muted hover:text-theme-accent"
                      title="Edit"
                    >
                      <Edit2 className="w-5 h-5" />
                    </Link>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { ProductForm, type ProductFormData } from "../../components/product/ProductForm";
import { Button } from "../../components/common/Button";

import { getProduct, updateProduct } from "../../services/productsApi";
import { useAuth } from "../../contexts/AuthContext";
import { categoriesMock } from "../../data/categories.mock";

export function ProductEdit() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { getAdminToken } = useAuth();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        if (!productId) return;

        const data = await getProduct(Number(productId));
        setProduct(data);
      } catch (err) {
        console.error("Failed to load product", err);
        alert("Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [productId]);

  const handleSave = async (data: ProductFormData) => {
    if (!productId) return;

    try {
      const token = getAdminToken();

      if (!token) {
        alert("Session expired. Please login again.");
        navigate("/admin/login");
        return;
      }

      await updateProduct(
        Number(productId),
        {
          name: data.name,
          sku: data.sku,
          category: data.categoryId,
          description: data.description,
        },
        token
      );

      navigate("/admin/products");

    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update product");
    }
  };

  if (loading) {
    return <div className="p-6 text-theme-text-muted">Loading product...</div>;
  }

  if (!product) {
    return (
      <div>
        <p className="text-theme-accent">Product not found</p>
        <Button
          variant="secondary"
          onClick={() => navigate("/admin/products")}
          className="mt-4"
        >
          Back to list
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button
          type="button"
          onClick={() => navigate("/admin/products")}
          className="p-2 text-theme-text-muted hover:text-theme-text rounded-lg hover:bg-theme-surface-hover"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-theme-text">Edit Product</h1>
          <p className="text-theme-text-muted text-sm">
            {product.name} — {product.sku}
          </p>
        </div>
      </div>

      <ProductForm
        product={product}
        categories={categoriesMock}
        onClose={() => navigate("/admin/products")}
        onSave={handleSave}
      />
    </div>
  );
}
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ProductForm, ProductFormData } from "../../components/product/ProductForm";
import { createProduct, uploadProductImage } from "../../services/productsApi";
import { Category } from "../../types/product";
import { categoriesMock } from "../../data/categories.mock";
import { useAuth } from "../../contexts/AuthContext";

export default function ProductCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Temporary categories (later can come from backend)
  const categories: Category[] = categoriesMock;

  const { getAdminToken } = useAuth();

  async function handleSave(data: ProductFormData) {
    try {
      setLoading(true);

      const token = getAdminToken();
      console.log("TOKEN:", token);

      if (!token) {
        alert("Session expired. Please login again.");
        navigate("/admin/login");
        return;
      }
      
      // 1️⃣ Create product in backend
      const product = await createProduct(
        {
          name: data.name,
          sku: data.sku,
          category: data.categoryId,
          description: data.description,
        },
        token
      );

      // 2️⃣ Upload image if provided
      if (data.images.length > 0) {
        const file = data.images[0];

        // convert base64 → file
        const res = await fetch(file);
        const blob = await res.blob();

        const uploadFile = new File([blob], "product-image.jpg", {
          type: blob.type,
        });

        await uploadProductImage(product.id, uploadFile, token);
      }

      // 3️⃣ Redirect back to product list
      navigate("/admin/products");

    } catch (error) {
      console.error("Product creation failed:", error);
      alert("Failed to create product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      <ProductForm
        categories={categories}
        onSave={handleSave}
        onClose={() => navigate("/admin/products")}
      />

      {loading && (
        <div className="text-center mt-4 text-sm text-gray-500">
          Creating product...
        </div>
      )}
    </div>
  );
}
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { ProductGallery } from "../../components/product/ProductGallery";
import { WhatsAppButton } from "../../components/product/WhatsAppButton";
import { Badge } from "../../components/common/Badge";

import { getProduct } from "../../services/productsApi";
import { categoriesMock } from "../../data/categories.mock";

import { recordProductView } from '../../services/analyticsApi'


export function ProductDetails() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if(product?.id){
        recordProductView(product.id)
    }
  }, [product])
  
  useEffect(() => {
    async function loadProduct() {
      try {
        if (!productId) return;

        const data = await getProduct(Number(productId));
        setProduct(data);
      } catch (err) {
        console.error("Failed to load product", err);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [productId]);

  const category = product
    ? categoriesMock.find((c) => c.id === product.category)
    : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-theme-text-muted">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text py-8">
      <div className="max-w-6xl mx-auto px-4">

        <nav className="flex items-center gap-2 text-sm text-theme-text-muted mb-6">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/products">Products</Link>
          <span>›</span>
          <span>{category?.name ?? "Product"}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <ProductGallery
            images={[product.image_url]}
            alt={product.name}
          />

          <div>
            <div className="flex items-center gap-2 mb-2">

              <Badge variant={product.is_active ? "active" : "inactive"}>
                {product.is_active ? "Active" : "Inactive"}
              </Badge>

              {category && <Badge variant="neutral">{category.name}</Badge>}

            </div>

            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-sm mb-4">SKU: {product.sku}</p>

            <p className="mb-6">{product.description}</p>

            <div className="flex gap-4">

              <WhatsAppButton
                productName={product.name}
                productId={product.id}
              />

              <button
                onClick={() => navigate("/products")}
                className="flex items-center gap-2 border px-4 py-2 rounded-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
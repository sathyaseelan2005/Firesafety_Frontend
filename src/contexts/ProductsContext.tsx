import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getProducts } from "../services/productsApi";
import type { Product } from "../types/product";

interface ProductsContextValue {
  products: Product[];
  refreshProducts: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {

  const [products, setProducts] = useState<Product[]>([]);

  async function refreshProducts() {
    const data = await getProducts();
    setProducts(data);
  }

  useEffect(() => {
    refreshProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, refreshProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
}
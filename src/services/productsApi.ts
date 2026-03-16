import { API_BASE } from "../config";

export async function createProduct(data: {
  name: string;
  sku: string;
  category: string;
  description?: string;
}, token: string) {

  const res = await fetch(`${API_BASE}/products/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Failed to create product");
  }

  return res.json();
}


export async function uploadProductImage(
  productId: number,
  file: File,
  token: string
) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/products/${productId}/image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  if (!res.ok) {
    throw new Error("Image upload failed");
  }

  return res.json();
}

export async function getProducts() {
  const res = await fetch(`${API_BASE}/products/`);

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
}

export async function getProduct(id: number) {
  const res = await fetch(`${API_BASE}/products/${id}`);

  if (!res.ok) throw new Error("Failed to fetch product");

  return res.json();
}

export async function updateProduct(
  id: number,
  data: any,
  token: string
) {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error("Failed to update product");

  return res.json();
}

export async function deleteProduct(
  id: number,
  token: string
) {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error("Failed to delete product");

  return res.json();
}
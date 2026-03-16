/** Product and Category types — matching backend */

export interface Category {
  id?: number
  name?: string
}

export interface Product {
  id: number
  name: string
  description?: string
  sku: string
  category: string
  image_url?: string
  is_active: boolean
}

export type ProductWithCategory = Product & {
  category?: Category
}
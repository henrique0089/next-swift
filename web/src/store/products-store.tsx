import { ProductData } from '@/app/(app)/products/page'
import { create } from 'zustand'

interface ProductsStore {
  products: ProductData[]
  setProducts: (products: ProductData[]) => void
  addProduct: (product: ProductData) => void
}

export const useProductsStore = create<ProductsStore>((set) => ({
  products: [],
  setProducts: (products: ProductData[]) => {
    set(() => ({ products }))
  },
  addProduct: (product: ProductData) => {
    set((state) => ({ products: [product, ...state.products] }))
  },
}))

import { CategoryOption } from '@/app/(app)/products/add/page'
import { ProductData } from '@/app/(app)/products/page'
import { create } from 'zustand'
import { DatesInfo } from './customers-store'

interface ProductsStore {
  products: ProductData[]
  setProducts: (products: ProductData[]) => void
  addProduct: (product: ProductData) => void
  categories: CategoryOption[]
  setCategories: (categories: CategoryOption[]) => void
  dates: DatesInfo | null
  setDates: (dates: DatesInfo) => void
}

export const useProductsStore = create<ProductsStore>((set) => ({
  products: [],
  setProducts: (products: ProductData[]) => {
    set(() => ({ products }))
  },
  addProduct: (product: ProductData) => {
    set((state) => ({ products: [product, ...state.products] }))
  },
  categories: [],
  setCategories: (categories: CategoryOption[]) => {
    set(() => ({ categories }))
  },
  dates: null,
  setDates: (dates: DatesInfo) => {
    set(() => ({ dates }))
  },
}))

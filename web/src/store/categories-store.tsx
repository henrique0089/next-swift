import { CategoryData } from '@/app/(app)/categories/page'
import { create } from 'zustand'

interface CategoriesStore {
  categories: CategoryData[]
  setCategories: (categories: CategoryData[]) => void
  addCategory: (category: CategoryData) => void
}

export const useCategoriesStore = create<CategoriesStore>((set) => ({
  categories: [],
  setCategories: (categories: CategoryData[]) => {
    set(() => ({ categories }))
  },
  addCategory: (category: CategoryData) => {
    set((state) => ({ categories: [category, ...state.categories] }))
  },
}))

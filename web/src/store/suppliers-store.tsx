import { SupplierData } from '@/app/(app)/suppliers/page'
import { create } from 'zustand'

export type DatesInfo = {
  from?: Date
  to?: Date
}

interface SuppliersStore {
  suppliers: SupplierData[]
  setSuppliers: (suppliers: SupplierData[]) => void
  dates: DatesInfo | null
  setDates: (dates: DatesInfo) => void
}

export const useSuppliersStore = create<SuppliersStore>((set) => ({
  suppliers: [],
  setSuppliers: (suppliers: SupplierData[]) => {
    set(() => ({ suppliers }))
  },
  dates: null,
  setDates: (dates: DatesInfo) => {
    set(() => ({ dates }))
  },
}))

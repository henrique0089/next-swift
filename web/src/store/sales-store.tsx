import { SaleData } from '@/app/(app)/sales/page'
import { create } from 'zustand'
import { DatesInfo } from './customers-store'

export type BasicInfos = {
  id: string
  name: string
}

interface SalesStore {
  sales: SaleData[]
  setSales: (sales: SaleData[]) => void
  products: BasicInfos[]
  setProducts: (products: BasicInfos[]) => void
  customers: BasicInfos[]
  setCustomers: (customers: BasicInfos[]) => void
  product?: string
  setProduct: (product: string) => void
  paymentMethod?: string
  setPaymentMethod: (paymentMethod: string) => void
  status?: string
  setStatus: (status: string) => void
  quantity?: string
  setQuantity: (quantity: string) => void
  dates: DatesInfo | null
  setDates: (dates: DatesInfo) => void
}

export const useSalesStore = create<SalesStore>((set) => ({
  sales: [],
  setSales: (sales: SaleData[]) => {
    set(() => ({ sales }))
  },
  products: [],
  setProducts: (products: BasicInfos[]) => {
    set(() => ({ products }))
  },
  customers: [],
  setCustomers: (customers: BasicInfos[]) => {
    set(() => ({ customers }))
  },
  setProduct: (product: string) => {
    set(() => ({ product }))
  },
  setPaymentMethod: (paymentMethod: string) => {
    set(() => ({ paymentMethod }))
  },
  setStatus: (status: string) => {
    set(() => ({ status }))
  },
  setQuantity: (quantity: string) => {
    set(() => ({ quantity }))
  },
  dates: null,
  setDates: (dates: DatesInfo) => {
    set(() => ({ dates }))
  },
}))

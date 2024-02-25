import { CustomerData } from '@/app/(app)/customers/page'
import { create } from 'zustand'

export type DatesInfo = {
  from?: Date
  to?: Date
}

interface CustomersStore {
  customers: CustomerData[]
  setCustomers: (customers: CustomerData[]) => void
  dates: DatesInfo | null
  setDates: (dates: DatesInfo) => void
}

export const useCustomersStore = create<CustomersStore>((set) => ({
  customers: [],
  setCustomers: (customers: CustomerData[]) => {
    set(() => ({ customers }))
  },
  dates: null,
  setDates: (dates: DatesInfo) => {
    set(() => ({ dates }))
  },
}))

import { Revenue } from '@/app/(app)/dashboard/page'
import { create } from 'zustand'

export type DatesInfo = {
  from?: Date
  to?: Date
}

interface DashboardStore {
  revenueMetrics: Revenue[]
  setRevenueMetrics: (metrics: Revenue[]) => void
  dates?: DatesInfo
  setDates: (dates: DatesInfo) => void
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  revenueMetrics: [],
  setRevenueMetrics: (metrics: Revenue[]) => {
    set(() => ({ revenueMetrics: metrics }))
  },
  setDates: (dates: DatesInfo) => {
    set(() => ({ dates }))
  },
}))

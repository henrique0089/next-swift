import { EmployeeData } from '@/app/(app)/employees/page'
import { create } from 'zustand'

export type DatesInfo = {
  from?: Date
  to?: Date
}

interface EmployeesStore {
  employees: EmployeeData[]
  setEmployees: (employees: EmployeeData[]) => void
  dates: DatesInfo | null
  setDates: (dates: DatesInfo) => void
}

export const useEmployeesStore = create<EmployeesStore>((set) => ({
  employees: [],
  setEmployees: (employees: EmployeeData[]) => {
    set(() => ({ employees }))
  },
  dates: null,
  setDates: (dates: DatesInfo) => {
    set(() => ({ dates }))
  },
}))

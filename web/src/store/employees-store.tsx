import { create } from 'zustand'

export type EmployeeData = {
  name: string
  email: string
  avatar: string | null
  gender: string
  role: string
}

interface EmployeesStore {
  employee: EmployeeData | null
  setEmployee: (data: EmployeeData) => void
}

export const useEmployeeStore = create<EmployeesStore>((set) => ({
  employee: null,
  setEmployee(data) {
    set(() => ({ employee: data }))
  },
}))

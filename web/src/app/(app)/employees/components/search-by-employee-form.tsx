'use client'

import { Input } from '@/components/ui/input'
import { api } from '@/lib/axios'
import { useEmployeesStore } from '@/store/employees-store'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { EmployeeData } from '../page'

const SearchByEmployeeFormSchema = z.object({
  employee: z.string(),
})

type SearchByEmployeeFormValues = z.infer<typeof SearchByEmployeeFormSchema>

export function SearchByEmployeeForm() {
  const { getToken } = useAuth()
  const { setEmployees, dates } = useEmployeesStore()
  const { handleSubmit, register, reset } = useForm<SearchByEmployeeFormValues>(
    {
      resolver: zodResolver(SearchByEmployeeFormSchema),
    },
  )

  async function handleSearch({ employee }: SearchByEmployeeFormValues) {
    const res = await api.get<{ employees: EmployeeData[] }>('/employees', {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
      params: {
        employee,
        startDate: dates?.from,
        endDate: dates?.to,
      },
    })

    setEmployees(res.data.employees)

    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="w-full">
      <Input placeholder="jhondoe" {...register('employee')} />
    </form>
  )
}

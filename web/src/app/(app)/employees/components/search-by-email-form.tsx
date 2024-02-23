'use client'

import { Input } from '@/components/ui/input'
import { api } from '@/lib/axios'
import { useEmployeesStore } from '@/store/employees-store'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { EmployeeData } from '../page'

const SearchByEmailFormSchema = z.object({
  email: z.string(),
})

type SearchByEmailFormValues = z.infer<typeof SearchByEmailFormSchema>

export function SearchByEmailForm() {
  const { getToken } = useAuth()
  const { setEmployees, dates } = useEmployeesStore()
  const { handleSubmit, register, reset } = useForm<SearchByEmailFormValues>({
    resolver: zodResolver(SearchByEmailFormSchema),
  })

  async function handleSearch({ email }: SearchByEmailFormValues) {
    const res = await api.get<{ employees: EmployeeData[] }>('/employees', {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
      params: {
        email,
        startDate: dates?.from,
        endDate: dates?.to,
      },
    })

    setEmployees(res.data.employees)

    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="w-full">
      <Input placeholder="jhondoe@gmail.com" {...register('email')} />
    </form>
  )
}

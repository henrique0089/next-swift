'use client'

import { Input } from '@/components/ui/input'
import { api } from '@/lib/axios'
import { useEmployeesStore } from '@/store/employees-store'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { EmployeeData } from '../page'

const SearchByDocumentFormSchema = z.object({
  document: z.string(),
})

type SearchByDocumentFormValues = z.infer<typeof SearchByDocumentFormSchema>

export function SearchByDocumentForm() {
  const { getToken } = useAuth()
  const { setEmployees, dates } = useEmployeesStore()
  const { handleSubmit, register, reset } = useForm<SearchByDocumentFormValues>(
    {
      resolver: zodResolver(SearchByDocumentFormSchema),
    },
  )

  async function handleSearch({ document }: SearchByDocumentFormValues) {
    const res = await api.get<{ employees: EmployeeData[] }>('/employees', {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
      params: {
        document,
        startDate: dates?.from,
        endDate: dates?.to,
      },
    })

    setEmployees(res.data.employees)

    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="w-full">
      <Input placeholder="000.000.000-00" {...register('document')} />
    </form>
  )
}

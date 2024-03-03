'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'
import { BasicInfos, useSalesStore } from '@/store/sales-store'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const searchCustomersFormSchema = z.object({
  search: z.string(),
})

type SearchCustomersFormValues = z.infer<typeof searchCustomersFormSchema>

export function SearchCustomersForm() {
  const { getToken } = useAuth()
  const { setCustomers } = useSalesStore()

  const { handleSubmit, register, reset } = useForm<SearchCustomersFormValues>({
    resolver: zodResolver(searchCustomersFormSchema),
  })

  async function handleSearchCustomers({ search }: SearchCustomersFormValues) {
    const res = await api.get<{ customers: BasicInfos[] }>('/customers', {
      params: {
        customer: search,
      },
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    })

    setCustomers(res.data.customers)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleSearchCustomers)} className="space-y-2">
      <Label htmlFor="search">Search Customers</Label>
      <Input id="search" placeholder="jhon doe..." {...register('search')} />
    </form>
  )
}

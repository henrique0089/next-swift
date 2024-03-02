'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'
import { useSalesStore } from '@/store/sales-store'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { SaleData } from '../page'

const searchSalesFormSchema = z.object({
  search: z.string(),
})

type SearchSalesFormValues = z.infer<typeof searchSalesFormSchema>

export function SearchSalesForm() {
  const { getToken } = useAuth()
  const { setSales, setProduct, dates, paymentMethod, status, quantity } =
    useSalesStore()

  const { handleSubmit, register, reset } = useForm<SearchSalesFormValues>({
    resolver: zodResolver(searchSalesFormSchema),
  })

  async function handleSearchSales({ search }: SearchSalesFormValues) {
    const res = await api.get<{ sales: SaleData[] }>('/sales', {
      params: {
        startDate: dates?.from,
        endDate: dates?.to,
        search,
        paymentMethod,
        status,
        limit: quantity,
      },
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    })

    reset()

    setSales(res.data.sales)
    setProduct(search)
  }

  return (
    <form
      onSubmit={handleSubmit(handleSearchSales)}
      className="w-full space-y-2"
    >
      <Label htmlFor="search">Search by any product</Label>
      <Input
        id="search"
        type="search"
        placeholder="white t-shirt..."
        {...register('search')}
      />
    </form>
  )
}

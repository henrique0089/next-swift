'use client'

import { Input } from '@/components/ui/input'
import { api } from '@/lib/axios'
import { useProductsStore } from '@/store/products-store'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ProductData } from '../page'

const searchProductsFormSchema = z.object({
  search: z.string(),
})

type SearchProductsFormValues = z.infer<typeof searchProductsFormSchema>

export function SearchProductsForm() {
  const { getToken } = useAuth()
  const { setProducts, categories, dates } = useProductsStore()

  const { handleSubmit, register, reset } = useForm<SearchProductsFormValues>({
    resolver: zodResolver(searchProductsFormSchema),
  })

  async function handleSearchProducts({ search }: SearchProductsFormValues) {
    const res = await api.get<{ products: ProductData[] }>('/products', {
      params: {
        startDate: dates?.from,
        endDate: dates?.to,
        search,
        categories,
      },
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    })

    reset()

    setProducts(res.data.products)
  }

  return (
    <form onSubmit={handleSubmit(handleSearchProducts)} className="w-full">
      <Input
        type="search"
        placeholder="white t-shirt..."
        {...register('search')}
      />
    </form>
  )
}

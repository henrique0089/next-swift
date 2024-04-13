'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ProductData } from '../page'

const searchProductsFormSchema = z.object({
  search: z.string(),
})

type SearchProductsFormValues = z.infer<typeof searchProductsFormSchema>

interface SearchProductsFormProps {
  onSearch: (products: ProductData[]) => void
}

export function SearchProductsForm({ onSearch }: SearchProductsFormProps) {
  const { getToken } = useAuth()

  const { handleSubmit, register, reset } = useForm<SearchProductsFormValues>({
    resolver: zodResolver(searchProductsFormSchema),
  })

  async function handleSearchProducts({ search }: SearchProductsFormValues) {
    const res = await api.get<{ products: ProductData[] }>('/products', {
      params: {
        search,
      },
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    })

    reset()

    onSearch(res.data.products)
  }

  return (
    <form onSubmit={handleSubmit(handleSearchProducts)} className="space-y-2">
      <Label htmlFor="search-products">Search by any product</Label>
      <Input
        id="search-products"
        placeholder="white t-shirt..."
        {...register('search')}
      />
    </form>
  )
}

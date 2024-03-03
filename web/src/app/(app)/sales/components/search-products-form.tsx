'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'
import { BasicInfos, useSalesStore } from '@/store/sales-store'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const searchProductsFormSchema = z.object({
  search: z.string(),
})

type SearchProductsFormValues = z.infer<typeof searchProductsFormSchema>

export function SearchProductsForm() {
  const { getToken } = useAuth()
  const { setProducts } = useSalesStore()

  const { handleSubmit, register, reset } = useForm<SearchProductsFormValues>({
    resolver: zodResolver(searchProductsFormSchema),
  })

  async function handleSearchProducts({ search }: SearchProductsFormValues) {
    const res = await api.get<{ products: BasicInfos[] }>('/products', {
      params: {
        search,
      },
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    })

    setProducts(res.data.products)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleSearchProducts)} className="space-y-2">
      <Label htmlFor="search">Search Products</Label>
      <Input
        id="search"
        placeholder="black t-shirt..."
        {...register('search')}
      />
    </form>
  )
}

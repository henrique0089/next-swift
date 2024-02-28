'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'
import { useCategoriesStore } from '@/store/categories-store'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CategoryData } from '../page'

const searchCategoryFormSchema = z.object({
  search: z.string(),
})

type SearchCategoryFormValues = z.infer<typeof searchCategoryFormSchema>

export function SearchCategoryForm() {
  const { getToken } = useAuth()
  const { setCategories } = useCategoriesStore()
  const { handleSubmit, register, reset } = useForm<SearchCategoryFormValues>({
    resolver: zodResolver(searchCategoryFormSchema),
  })

  async function handleSearchCategory({ search }: SearchCategoryFormValues) {
    const { data } = await api.get<{ categories: CategoryData[] }>(
      '/categories/search',
      {
        params: {
          search,
        },
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      },
    )

    reset()
    setCategories(data.categories)
  }

  return (
    <form onSubmit={handleSubmit(handleSearchCategory)} className="space-y-2">
      <Label htmlFor="search">Search by any category</Label>
      <Input
        id="search"
        placeholder="Yellow t-shirts..."
        {...register('search')}
      />
    </form>
  )
}

'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CategoryData } from '../../categories/page'
import { CategoryOption } from '../add/page'

const searchCategoryFormSchema = z.object({
  search: z.string(),
})

type SearchCategoryFormValues = z.infer<typeof searchCategoryFormSchema>

interface SearchCategoriesFormProps {
  onSearch: (categories: CategoryOption[]) => void
}

export function SearchCategoriesForm({ onSearch }: SearchCategoriesFormProps) {
  const { getToken } = useAuth()
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
    onSearch(
      data.categories.map((category) => {
        return {
          label: category.name,
          value: category.id,
        }
      }),
    )
  }

  return (
    <form onSubmit={handleSubmit(handleSearchCategory)} className="space-y-2">
      <Label htmlFor="search-categories">Search by any category</Label>
      <Input
        id="search-categories"
        placeholder="Yellow t-shirts..."
        {...register('search')}
      />
    </form>
  )
}

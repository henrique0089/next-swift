'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'
import { useCategoriesStore } from '@/store/categories-store'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { CategoryData } from '../page'

const createCategoryFormSchema = z.object({
  category: z.string(),
})

type CreateCategoryFormValues = z.infer<typeof createCategoryFormSchema>

export function CreateCategoryForm() {
  const { getToken } = useAuth()
  const { addCategory } = useCategoriesStore()
  const { handleSubmit, register, reset } = useForm<CreateCategoryFormValues>({
    resolver: zodResolver(createCategoryFormSchema),
  })

  async function handleCreateCategory({ category }: CreateCategoryFormValues) {
    try {
      const { data } = await api.post<{ category: CategoryData }>(
        '/categories',
        {
          name: category,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      )

      reset()
      addCategory(data.category)

      toast('Congratulations!', {
        description: 'category created successfuly!',
        position: 'bottom-right',
        dismissible: true,
        duration: 2000,
        cancel: {
          label: 'dismiss',
        },
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        toast('Uh oh! Something went wrong.', {
          description: error.response?.data.message,
          position: 'bottom-right',
          dismissible: true,
          duration: 2000,
          cancel: {
            label: 'dismiss',
          },
        })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(handleCreateCategory)} className="space-y-2">
      <Label htmlFor="category">Create a category</Label>
      <Input
        id="category"
        placeholder="Black shoes"
        {...register('category')}
      />
    </form>
  )
}

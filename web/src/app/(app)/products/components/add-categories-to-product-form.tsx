'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { api } from '@/lib/axios'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { Loader2, Tags } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { CategoryOption } from '../add/page'
import { ProductData } from '../page'
import { CategoryCheckbox } from './category-checkbox'

const addCategoriesToProductFormSchema = z.object({
  productId: z.string(),
})

type AddCategoriesToProductFormValues = z.infer<
  typeof addCategoriesToProductFormSchema
>

interface AddCategoriesToProductFormProps {
  products: ProductData[]
  categories: CategoryOption[]
}

export function AddCategoriesToProductForm({
  products,
  categories,
}: AddCategoriesToProductFormProps) {
  const { getToken } = useAuth()
  const [selectedCategories, setSelectedCategories] = useState<
    CategoryOption[]
  >([])
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<AddCategoriesToProductFormValues>({
    resolver: zodResolver(addCategoriesToProductFormSchema),
  })

  async function handleAddCategories({
    productId,
  }: AddCategoriesToProductFormValues) {
    try {
      await api.post(
        `/products/${productId}/categories/add`,
        {
          categoriesIds: selectedCategories.map((category) => category.value),
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      )

      toast('Congratulations!', {
        description: 'categories added succesfuly!',
        position: 'bottom-right',
        dismissible: true,
        duration: 2000,
        cancel: {
          label: 'dismiss',
        },
      })
    } catch (error) {
      console.log(error)
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
    <form onSubmit={handleSubmit(handleAddCategories)}>
      <div className="space-y-4 lg:flex-1">
        <div className="space-y-2 flex-1">
          <Label>Product</Label>
          <div className="space-y-1">
            <Controller
              control={control}
              name="productId"
              render={({ field: { onChange } }) => (
                <Select
                  disabled={products.length === 0}
                  onValueChange={onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Nothing selected" />
                  </SelectTrigger>

                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <p className="text-[0.8rem] text-muted-foreground">
              Search by any customer to select.
            </p>
          </div>
        </div>

        {categories.length < 1 ? (
          <div className="flex flex-col items-center gap-1">
            <Tags className="h-8 w-8 stroke-muted-foreground" />
            <p className="text-[0.8rem] text-muted-foreground">
              Search by any categories to select.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2 flex-1">
              <Label>Categories</Label>
              <div className="grid grid-cols-4 justify-between gap-4 lg:grid-cols-1 lg:justify-normal lg:space-y-4 lg:gap-0">
                {categories.map((category) => (
                  <CategoryCheckbox
                    key={category.value}
                    id={category.value}
                    label={category.label}
                    selected={selectedCategories}
                    onUpdate={setSelectedCategories}
                  />
                ))}
              </div>
            </div>

            <Button disabled={isSubmitting} className="hidden lg:inline-flex">
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Add categories
            </Button>
          </>
        )}
      </div>
    </form>
  )
}

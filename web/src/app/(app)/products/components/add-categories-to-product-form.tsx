'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { CategoryOption } from '../add/page'
import { ProductData } from '../page'
import { CategoryCheckbox } from './category-checkbox'

const addCategoriesToProductFormSchema = z.object({
  productId: z.string(),
  categoriesIds: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .array()
    .min(1, { message: 'select at least 1 category.' }),
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
  const [isOpen, setIsOpen] = useState(false)
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<AddCategoriesToProductFormValues>({
    resolver: zodResolver(addCategoriesToProductFormSchema),
  })

  async function handleAddCategories(data: AddCategoriesToProductFormValues) {
    // try {
    //   await api.post<{ billet: Buffer }>(
    //     '/sales',
    //     {
    //       productsQty: data.quantity,
    //       productId: data.productId,
    //       buyerId: data.customerId,
    //       paymentMethod: data.payment_method,
    //       paymentStatus: data.payment_status,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${await getToken()}`,
    //       },
    //     },
    //   )

    //   reset()
    //   toast('Congratulations!', {
    //     description: 'sale added succesfuly!',
    //     position: 'bottom-right',
    //     dismissible: true,
    //     duration: 2000,
    //     cancel: {
    //       label: 'dismiss',
    //     },
    //   })
    // } catch (error) {
    //   console.log(error)
    //   if (error instanceof AxiosError) {
    //     toast('Uh oh! Something went wrong.', {
    //       description: error.response?.data.message,
    //       position: 'bottom-right',
    //       dismissible: true,
    //       duration: 2000,
    //       cancel: {
    //         label: 'dismiss',
    //       },
    //     })
    //   }
    // }
    console.log(data)
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
          <h2>No categories</h2>
        ) : (
          <div className="space-y-2 flex-1">
            <Label>Categories</Label>
            <div className="grid grid-cols-4 justify-between gap-4 lg:grid-cols-1 lg:justify-normal lg:space-y-4 lg:gap-0">
              <Controller
                control={control}
                name="categoriesIds"
                render={({ field: { onChange, value } }) => (
                  <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                      >
                        Select category...
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="p-2 space-y-2">
                      {categories.map((category) => (
                        <CategoryCheckbox
                          key={category.value}
                          id={category.value}
                          label={category.label}
                          selected={categories}
                          onUpdate={onChange}
                        />
                      ))}
                    </PopoverContent>
                  </Popover>
                )}
              />
              <p className="text-[0.8rem] text-muted-foreground">
                Search by any product to select.
              </p>
            </div>
          </div>
        )}

        <Button disabled={isSubmitting} className="hidden lg:inline-flex">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add categories
        </Button>
      </div>
    </form>
  )
}

'use client'

import { FormError } from '@/components/form-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/axios'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { CategoryOption } from '../add/page'
import { Dropzone } from './dropzone'

const addProductFormSchema = z.object({
  name: z.string().min(5, { message: 'Name must have at least 5 words' }),
  description: z.string().optional(),
  width: z.coerce.number().min(1, { message: 'Provide a valid width' }),
  height: z.coerce.number().min(1, { message: 'Provide a valid height' }),
  weight: z.coerce.number().min(1, { message: 'Provide a valid weight' }),
  price: z.coerce.number().min(1, { message: 'Provide a valid price' }),
  quantity: z.coerce.number().min(1, { message: 'Provide a valid quantity' }),
  images: z.instanceof(File).array().min(1),
  category: z.string({ required_error: 'Select 1 category' }),
})

type AddProductFormValues = z.infer<typeof addProductFormSchema>

interface AddProductFormProps {
  categories: CategoryOption[]
}

export function AddProductForm({ categories }: AddProductFormProps) {
  const { getToken } = useAuth()
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<AddProductFormValues>({
    resolver: zodResolver(addProductFormSchema),
  })

  async function handleAddProduct(data: AddProductFormValues) {
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('width', String(data.width))
    formData.append('height', String(data.height))
    formData.append('quantity', String(data.quantity))
    formData.append('price', String(data.price))
    formData.append('weight', String(data.weight))
    formData.append('categories', JSON.stringify([data.category]))

    if (data.description) {
      formData.append('description', data.description)
    }

    for (const img of data.images) {
      formData.append('images', img)
    }

    try {
      await api.post('/products', formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })

      reset()
      toast('Congratulations!', {
        description: 'product added to your catalog succesfuly!',
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

  const nameErr = errors.name?.message
  const widthErr = errors.width?.message
  const heightErr = errors.height?.message
  const weightErr = errors.weight?.message
  const priceErr = errors.price?.message
  const quantityErr = errors.quantity?.message
  const imagesErr = errors.images?.message
  const categoryErr = errors.category?.message

  return (
    <form onSubmit={handleSubmit(handleAddProduct)} className="space-y-4">
      <div className="grid grid-cols-1 space-y-6 lg:grid-cols-[16rem_1fr] lg:space-x-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="width">Width (cm)</Label>
            <Input id="width" placeholder="180" {...register('width')} />
            {widthErr && <FormError>{widthErr}</FormError>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input id="height" placeholder="362" {...register('height')} />
            {heightErr && <FormError>{heightErr}</FormError>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Weight (cm)</Label>
            <Input id="weight" placeholder="55" {...register('weight')} />
            {weightErr && <FormError>{weightErr}</FormError>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (US$)</Label>
            <Input id="price" placeholder="72.90" {...register('price')} />
            {priceErr && <FormError>{priceErr}</FormError>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input id="quantity" placeholder="63" {...register('quantity')} />
            {quantityErr && <FormError>{quantityErr}</FormError>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Controller
              control={control}
              name="category"
              render={({ field: { onChange } }) => (
                <Select onValueChange={onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {categoryErr && <FormError>{categoryErr}</FormError>}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="White t-shirt..."
              {...register('name')}
            />
            {nameErr && <FormError>{nameErr}</FormError>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Lorem ipsum dolor sit amet..."
              className="h-32 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Controller
              control={control}
              name="images"
              render={({ field: { onChange, value } }) => (
                <>
                  <Label htmlFor="images">
                    Images ({value?.length ?? '0'})
                  </Label>
                  <Dropzone id="images" onChange={onChange} />
                </>
              )}
            />
            {imagesErr && <FormError>Select at least 1 image</FormError>}
          </div>

          <Button disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Product
          </Button>
        </div>
      </div>
    </form>
  )
}

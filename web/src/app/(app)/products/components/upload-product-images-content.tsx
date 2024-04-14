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
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { ProductData } from '../page'
import { Dropzone } from './dropzone'
import { SearchProductsForm } from './search-products-form'

const uploadProductImagesFormSchema = z.object({
  productId: z.string(),
  images: z
    .array(z.instanceof(File))
    .min(1, { message: 'select at least 1 image' }),
})

type UploadProductImagesContent = z.infer<typeof uploadProductImagesFormSchema>

export function UploadProductImagesContent() {
  const [products, setProducts] = useState<ProductData[]>([])
  const { getToken } = useAuth()

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<UploadProductImagesContent>({
    resolver: zodResolver(uploadProductImagesFormSchema),
  })

  async function handleUploadImages({
    productId,
    images,
  }: UploadProductImagesContent) {
    const formData = new FormData()

    images.forEach((img) => formData.append('images', img))

    try {
      await api.post(`/products/${productId}/images/upload`, formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })

      toast('Congratulations!', {
        description: 'images added to your product succesfuly!',
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
    <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] lg:items-start space-y-8 lg:space-y-0 lg:space-x-4">
      <nav>
        <SearchProductsForm onSearch={setProducts} />
      </nav>

      <form onSubmit={handleSubmit(handleUploadImages)} className="space-y-4">
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
              Search by any product to select.
            </p>
          </div>
        </div>

        <Controller
          control={control}
          name="images"
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="images">
                images ({field.value?.length ?? 0})
              </Label>

              <Dropzone id="images" onChange={field.onChange} />
            </div>
          )}
        />

        <Button disabled={isSubmitting} className="hidden lg:inline-flex">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Upload
        </Button>
      </form>
    </div>
  )
}

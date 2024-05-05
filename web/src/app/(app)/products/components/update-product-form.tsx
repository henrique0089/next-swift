'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/axios'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { ProductResponseData } from '../[id]/edit/page'

const updateProductFormSchema = z.object({
  name: z.string().min(5, { message: 'Name must have at least 5 words' }),
  description: z.string().optional(),
  width: z.coerce.number(),
  height: z.coerce.number(),
  weight: z.coerce.number(),
  price: z.coerce.number(),
  quantity: z.coerce.number(),
})

type UpdateProductFormValues = z.infer<typeof updateProductFormSchema>

interface UpdateProductFormProps {
  product: ProductResponseData
}

export function UpdateProductForm({ product }: UpdateProductFormProps) {
  const { getToken } = useAuth()
  const form = useForm<UpdateProductFormValues>({
    resolver: zodResolver(updateProductFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: product.name,
      description: product.description,
      width: product.width,
      height: product.height,
      weight: product.weight,
      price: product.price,
      quantity: product.quantity,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  async function handleUpdateProduct(data: UpdateProductFormValues) {
    try {
      await api.put(`/products/${product.id}/update`, data, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })

      toast('Congratulations!', {
        description: 'Product details updated succesfuly!',
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
    <Form {...form}>
      <form onSubmit={handleSubmit(handleUpdateProduct)} className="space-y-4">
        <div className="grid grid-cols-1 space-y-6 lg:grid-cols-[16rem_1fr] lg:space-x-4">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="width"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Width (cm)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="180" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height (cm)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="362" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (cm)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="55" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (US$)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="72.90" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="63" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="White t-shirt..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Lorem ipsum dolor sit amet..."
                      className="h-32 resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update Product
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

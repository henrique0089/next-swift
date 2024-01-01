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
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const addProductFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  width: z.coerce.number(),
  height: z.coerce.number(),
  weight: z.coerce.number(),
  price: z.coerce.number(),
  quantity: z.coerce.number(),
  categories: z.string().array(),
})

type AddProductFormValues = z.infer<typeof addProductFormSchema>

export function AddProductForm() {
  const form = useForm<AddProductFormValues>({
    resolver: zodResolver(addProductFormSchema),
    mode: 'onChange',
  })

  function handleAddProduct(data: AddProductFormValues) {
    console.log({ ...data })
  }

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleAddProduct)} className="space-y-4">
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

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="width"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Width (cm)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="180" />
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
                  <Input {...field} placeholder="362" />
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
                  <Input {...field} placeholder="55" />
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
                  <Input {...field} placeholder="63" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add Product
        </Button>
      </form>
    </Form>
  )
}

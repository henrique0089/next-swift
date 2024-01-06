'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const addSaleFormSchema = z.object({
  customerId: z.string(),
  productId: z.string(),
  quantity: z.coerce.number(),
  payment_method: z.enum(['money', 'credit', 'debit']),
})

type AddSaleFormValues = z.infer<typeof addSaleFormSchema>

export function AddSaleForm() {
  const form = useForm<AddSaleFormValues>({
    resolver: zodResolver(addSaleFormSchema),
    mode: 'onChange',
  })

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = form

  function handleAddSale(data: AddSaleFormValues) {
    console.log({ data })

    setValue('customerId', '')
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleAddSale)}>
        <div className="flex flex-col gap-4 lg:items-start lg:flex-row">
          <div className="space-y-4 lg:w-[16rem] order-1 lg:order-none">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="2" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="payment_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Nothing selected" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="money">Money</SelectItem>
                        <SelectItem value="credit">Credit Card</SelectItem>
                        <SelectItem value="debit">Debit Card</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Select a payment method.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isSubmitting} className="lg:hidden">
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Add sale
            </Button>
          </div>

          <div className="space-y-4 lg:flex-1">
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Nothing selected" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="1">Jhon doe</SelectItem>
                        <SelectItem value="2">Henrique Monteiro</SelectItem>
                        <SelectItem value="3">Diego fernandes</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Select any customer.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Nothing selected" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="1">Black T-Shirt</SelectItem>
                        <SelectItem value="2">White Shoes</SelectItem>
                        <SelectItem value="3">Orange pants</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Select any product.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isSubmitting} className="hidden lg:inline-flex">
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Add sale
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

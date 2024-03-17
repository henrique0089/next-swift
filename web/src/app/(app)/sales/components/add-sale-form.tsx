'use client'

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
import { api } from '@/lib/axios'
import { useSalesStore } from '@/store/sales-store'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const addSaleFormSchema = z.object({
  customerId: z.string(),
  productId: z.string(),
  quantity: z.coerce.number(),
  payment_method: z.enum(['MONEY', 'CREDIT', 'DEBIT']),
  payment_status: z.enum(['PENDING', 'PAID']).optional().default('PENDING'),
})

type AddSaleFormValues = z.infer<typeof addSaleFormSchema>

export function AddSaleForm() {
  const { getToken } = useAuth()
  const { products, customers } = useSalesStore()
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { isSubmitting, errors },
  } = useForm<AddSaleFormValues>({
    resolver: zodResolver(addSaleFormSchema),
  })

  async function handleAddSale(data: AddSaleFormValues) {
    try {
      const res = await api.post<{ billet: Buffer }>(
        '/sales',
        {
          productsQty: data.quantity,
          productId: data.productId,
          buyerId: data.customerId,
          paymentMethod: data.payment_method,
          paymentStatus: data.payment_status,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      )

      reset()
      toast('Congratulations!', {
        description: 'sale added succesfuly!',
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
    <form onSubmit={handleSubmit(handleAddSale)}>
      <div className="flex flex-col gap-4 lg:items-start lg:flex-row">
        <div className="space-y-4 lg:w-[16rem] order-1 lg:order-none">
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <div className="space-y-1">
              <Input
                id="quantity"
                placeholder="2"
                type="number"
                min={1}
                {...register('quantity')}
              />
              <p className="text-[0.8rem] text-muted-foreground">
                Select a quantity.
              </p>
              {errors.quantity?.type === 'required' && (
                <span>{errors.quantity.message}</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Payment Method</Label>
            <div className="space-y-1">
              <Controller
                control={control}
                name="payment_method"
                render={({ field: { onChange } }) => (
                  <Select onValueChange={onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Nothing selected" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="MONEY">Money</SelectItem>
                      <SelectItem value="CREDIT">Credit Card</SelectItem>
                      <SelectItem value="DEBIT">Debit Card</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <p className="text-[0.8rem] text-muted-foreground">
                Select a payment method.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Payment Status (optional)</Label>
            <div className="space-y-1">
              <Controller
                control={control}
                name="payment_status"
                render={({ field: { onChange } }) => (
                  <Select onValueChange={onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Nothing selected" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="PAID">Paid</SelectItem>
                      <SelectItem value="PENDING">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <p className="text-[0.8rem] text-muted-foreground">
                Select a payment status.
              </p>
            </div>
          </div>

          <Button disabled={isSubmitting} className="lg:hidden">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add sale
          </Button>
        </div>

        <div className="space-y-4 lg:flex-1">
          <div className="space-y-2 flex-1">
            <Label>Customer</Label>
            <div className="space-y-1">
              <Controller
                control={control}
                name="customerId"
                render={({ field: { onChange } }) => (
                  <Select
                    disabled={customers.length === 0}
                    onValueChange={onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Nothing selected" />
                    </SelectTrigger>

                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name}
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

          <Button disabled={isSubmitting} className="hidden lg:inline-flex">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add sale
          </Button>
        </div>
      </div>
    </form>
  )
}

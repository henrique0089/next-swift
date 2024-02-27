'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { CustomerDetails } from '../[id]/edit/page'

const updateCustomerFormSchema = z.object({
  name: z.string().min(3, { message: 'Name must have at least 3 words' }),
  email: z.string().email('Provide an valid e-mail'),
  cpf: z.string(),
  ddd: z.coerce.number().min(2, { message: 'DDD must have 2 numbers' }),
  phone: z.coerce.number().min(9, { message: 'Phone must have 9 numbers' }),
})

type UpdateCustomerFormValues = z.infer<typeof updateCustomerFormSchema>

interface UpdateCustomerFormProps {
  customerId: string
  customer: CustomerDetails
}

export function UpdateCustomerForm({
  customerId,
  customer,
}: UpdateCustomerFormProps) {
  const { getToken } = useAuth()
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<UpdateCustomerFormValues>({
    resolver: zodResolver(updateCustomerFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: customer.name,
      email: customer.email,
      cpf: customer.document,
      ddd: customer.ddd,
      phone: customer.phone,
    },
  })

  async function handleupdateCustomer(data: UpdateCustomerFormValues) {
    try {
      await api.put(`/customers/${customerId}/update`, data, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })

      toast('Congratulations!', {
        description: 'you updated data of this customer!',
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
    <form onSubmit={handleSubmit(handleupdateCustomer)}>
      <div className="flex flex-col gap-4 lg:items-start lg:flex-row">
        <div className="space-y-4 lg:w-[16rem] order-1 lg:order-none">
          <div className="space-y-2">
            <Label htmlFor="cpf">Cpf</Label>
            <Input
              id="cpf"
              placeholder="000.000.000-00"
              disabled
              {...register('cpf')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ddd">DDD</Label>
            <Input id="ddd" placeholder="82" {...register('ddd')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" placeholder="999999999" {...register('phone')} />
          </div>

          <Button disabled={isSubmitting} className="lg:hidden">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update customer
          </Button>
        </div>

        <div className="space-y-4 lg:flex-1">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Jhon doe" {...register('name')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="jhondoe@gmail.com"
              {...register('email')}
            />
          </div>

          <Button disabled={isSubmitting} className="hidden lg:inline-flex">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update customer
          </Button>
        </div>
      </div>
    </form>
  )
}

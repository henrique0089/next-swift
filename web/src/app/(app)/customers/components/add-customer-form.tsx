'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const addCustomerFormSchema = z.object({
  name: z.string().min(3, { message: 'Name must have at least 3 words' }),
  email: z.string().email('Provide an valid e-mail'),
  document: z.string(),
  ddd: z.coerce.number().min(2, { message: 'DDD must have 2 numbers' }),
  phone: z.coerce.number().min(9, { message: 'Phone must have 9 numbers' }),
  street: z.string(),
  number: z.coerce.number(),
  complement: z.string().optional(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
})

type AddCustomerFormValues = z.infer<typeof addCustomerFormSchema>

export function AddCustomerForm() {
  const { getToken } = useAuth()

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm<AddCustomerFormValues>({
    resolver: zodResolver(addCustomerFormSchema),
  })

  async function handleAddCustomer(data: AddCustomerFormValues) {
    const {
      name,
      email,
      document,
      ddd,
      phone,
      street,
      number,
      complement,
      city,
      state,
      postalCode,
    } = data
    try {
      await api.post<{ password: string }>(
        '/customers',
        {
          name,
          email,
          document,
          ddd,
          phone,
          address: {
            street,
            number,
            complement,
            city,
            state,
            postalCode,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      )

      reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleAddCustomer)}
      className="flex flex-col gap-4 lg:items-start lg:flex-row"
    >
      <div className="space-y-4 lg:w-[16rem] order-1 lg:order-none">
        <div className="space-y-2">
          <Label htmlFor="cpf">Cpf</Label>
          <Input
            id="cpf"
            placeholder="000.000.000-00"
            {...register('document')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ddd">DDD</Label>
          <Input id="ddd" placeholder="82" {...register('ddd')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="000000000" {...register('phone')} />
        </div>

        <Button disabled={isSubmitting} className="lg:hidden">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add Customer
        </Button>
      </div>

      <div className="space-y-4 lg:flex-1">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="jhon doe" {...register('name')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="jhondoe@gmail.com"
            {...register('email')}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="street">Street</Label>
            <Input
              id="street"
              placeholder="some street"
              {...register('street')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="são paulo" {...register('city')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="complement">Complement</Label>
            <Input
              id="complement"
              placeholder="some complement"
              {...register('complement')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" placeholder="sp" {...register('state')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cep">Cep</Label>
            <Input
              id="cep"
              placeholder="000.000-00"
              {...register('postalCode')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="number">Number</Label>
            <Input id="number" placeholder="23" {...register('number')} />
          </div>
        </div>

        <Button disabled={isSubmitting} className="hidden lg:inline-flex">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add Customer
        </Button>
      </div>
    </form>
  )
}

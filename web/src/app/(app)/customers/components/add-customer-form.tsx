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
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const addCustomerFormSchema = z.object({
  name: z.string().min(3, { message: 'Name must have at least 3 words' }),
  email: z.string().email('Provide an valid e-mail'),
  cpf: z.string(),
  ddd: z.coerce.number().min(2, { message: 'DDD must have 2 numbers' }),
  phone: z.coerce.number().min(9, { message: 'Phone must have 9 numbers' }),
})

type AddCustomerFormValues = z.infer<typeof addCustomerFormSchema>

export function AddCustomerForm() {
  const form = useForm<AddCustomerFormValues>({
    resolver: zodResolver(addCustomerFormSchema),
    mode: 'onChange',
  })

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = form

  function handleAddCustomer(data: AddCustomerFormValues) {
    console.log({ data })

    setValue('name', '')
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleAddCustomer)}>
        <div className="flex flex-col gap-4 lg:items-start lg:flex-row">
          <div className="space-y-4 lg:w-[16rem] order-1 lg:order-none">
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="000.000.000-00" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ddd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DDD</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="82" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="999999999" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isSubmitting} className="lg:hidden">
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Add Customer
            </Button>
          </div>

          <div className="space-y-4 lg:flex-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jhon doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="jhondoe@gmail.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isSubmitting} className="hidden lg:inline-flex">
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Add Customer
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

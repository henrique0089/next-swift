'use client'

import { MaskedInput } from '@/components/masked-input'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { Loader2, Plus } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const addSupplierFormSchema = z.object({
  name: z.string().min(3, { message: 'Name must have at least 3 words' }),
  email: z.string().email('Provide an valid e-mail'),
  document: z.string(),
  ddd: z.coerce.number().min(2, { message: 'DDD must have 2 numbers' }),
  phone: z.coerce.number().min(9, { message: 'Phone must have 9 numbers' }),
  addresses: z
    .object({
      street: z.string(),
      number: z.coerce.number(),
      complement: z.string().optional(),
      city: z.string(),
      state: z.string(),
      postalCode: z.string(),
    })
    .array(),
})

type AddSupplierFormValues = z.infer<typeof addSupplierFormSchema>

export function AddSupplierForm() {
  const { getToken } = useAuth()

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<AddSupplierFormValues>({
    resolver: zodResolver(addSupplierFormSchema),
  })

  async function handleAddSupplier(data: AddSupplierFormValues) {
    const { name, email, document, ddd, phone, addresses } = data

    try {
      await api.post(
        '/suppliers',
        {
          name,
          email,
          cnpj: document,
          ddd,
          phone,
          addresses,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      )

      reset()

      toast('Congratulations!', {
        description: 'you added a new supplier!',
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'addresses',
  })

  function addAddress() {
    append({
      street: '',
      city: '',
      state: '',
      number: 0,
      postalCode: '',
      complement: '',
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleAddSupplier)}
      className="flex flex-col gap-4 lg:items-start lg:flex-row"
    >
      <div className="space-y-4 lg:w-[16rem] order-1 lg:order-none">
        <div className="space-y-2">
          <Label htmlFor="cnpj">Cnpj</Label>
          <MaskedInput
            id="cnpj"
            mask="cnpj"
            placeholder="00.000.000/0000-00"
            {...register('document')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ddd">DDD</Label>
          <Input id="ddd" placeholder="82" {...register('ddd')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            maxLength={9}
            placeholder="000000000"
            {...register('phone')}
          />
        </div>

        <Button disabled={isSubmitting} className="lg:hidden">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add Supplier
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

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight">Addresses</h2>

            <Button
              type="button"
              variant="secondary"
              onClick={addAddress}
              className="rounded-[50%] h-8 w-8 p-0"
            >
              <Plus className="size-4" />
            </Button>
          </div>

          <div className="space-y-8">
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="street">Street</Label>
                      <Input
                        id="street"
                        placeholder="some street"
                        {...register(`addresses.${index}.street`)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="são paulo"
                        {...register(`addresses.${index}.city`)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="complement">Complement</Label>
                      <Input
                        id="complement"
                        placeholder="some complement"
                        {...register(`addresses.${index}.complement`)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        placeholder="sp"
                        {...register(`addresses.${index}.state`)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cep">Cep</Label>
                      <MaskedInput
                        id="cep"
                        mask="cep"
                        placeholder="00000-000"
                        {...register(`addresses.${index}.postalCode`)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="number">Number</Label>
                      <Input
                        id="number"
                        type="number"
                        placeholder="23"
                        {...register(`addresses.${index}.number`)}
                      />
                    </div>
                  </div>

                  <Button
                    variant="secondary"
                    onClick={() => remove(index)}
                    className="rounded-full"
                  >
                    Remove
                  </Button>
                </div>
              )
            })}
          </div>
        </div>

        <Button disabled={isSubmitting} className="hidden lg:inline-flex">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add Supplier
        </Button>
      </div>
    </form>
  )
}

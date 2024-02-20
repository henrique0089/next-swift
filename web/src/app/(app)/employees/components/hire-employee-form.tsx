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
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const hireEmployeeFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  ddd: z.coerce.number(),
  phone: z.coerce.number(),
  gender: z.enum(['M', 'F']),
  role: z.string(),
})

type HireEmployeeFormValues = z.infer<typeof hireEmployeeFormSchema>

interface HireEmployeeFormProps {
  roles: string[]
}

export function HireEmployeeForm({ roles }: HireEmployeeFormProps) {
  const { getToken } = useAuth()

  const form = useForm<HireEmployeeFormValues>({
    resolver: zodResolver(hireEmployeeFormSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  async function handleHireEmployee(data: HireEmployeeFormValues) {
    let pass: string | null = null

    try {
      const res = await api.post<{ password: string }>('/employees', data, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })

      pass = res.data.password
    } catch (error: any) {
      toast('Uh oh! Something went wrong.', {
        description: error.response.data.message,
        position: 'bottom-right',
        dismissible: true,
        duration: 1500,
        cancel: {
          label: 'dismiss',
        },
      })
    }

    if (pass) {
      await axios.post('/api/employees/send-email', { email: data.email, pass })

      toast('Congratulations!', {
        description: 'you hired a new employee.',
        position: 'bottom-right',
        dismissible: true,
        duration: 2000,
        cancel: {
          label: 'dismiss',
        },
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleHireEmployee)} className="space-y-4">
        <div className="grid grid-cols-1 space-y-6 lg:grid-cols-[16rem_1fr] lg:space-x-4">
          <div className="space-y-4">
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
                    <Input {...field} placeholder="000000000" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M">M</SelectItem>
                        <SelectItem value="F">F</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jhon" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
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
                    <Input placeholder="jhondoe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Hire employee
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

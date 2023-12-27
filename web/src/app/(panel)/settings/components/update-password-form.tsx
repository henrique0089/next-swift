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

interface UpdatePasswordFormProps {
  user: {
    firstName: string | null
    lastName: string | null
    imageUrl: string
  }
}

const updatePasswordFormSchema = z.object({
  password: z.string(),
  newPass: z.string(),
  newPassConfirmation: z.string(),
})

type UpdatePasswordFormValues = z.infer<typeof updatePasswordFormSchema>

export function UpdatePasswordForm() {
  const form = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordFormSchema),
    mode: 'onChange',
  })

  function handleUpdatePassword(data: UpdatePasswordFormValues) {
    console.log({ ...data })
  }

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleUpdatePassword)} className="space-y-8">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="type your current password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="newPass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input placeholder="type your new password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password Confirmation</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="type your new password again"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update password
        </Button>
      </form>
    </Form>
  )
}

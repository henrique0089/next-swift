'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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

const recoveryPasswordFormSchema = z.object({
  email: z.string().email('Provide an valid e-mail'),
})

type RecoveryPasswordFormValues = z.infer<typeof recoveryPasswordFormSchema>

export function RecoveryPasswordForm() {
  const form = useForm<RecoveryPasswordFormValues>({
    resolver: zodResolver(recoveryPasswordFormSchema),
    mode: 'onChange',
  })

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = form

  async function handleSendResetPassEmail(data: RecoveryPasswordFormValues) {
    console.log(data)

    setValue('email', '')
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleSendResetPassEmail)}
        className="space-y-3 w-full"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="name@example.com" type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isSubmitting} className="w-full">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send
        </Button>
      </form>
    </Form>
  )
}

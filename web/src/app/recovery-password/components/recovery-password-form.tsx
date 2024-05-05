'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormError } from '@/components/form-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
    register,
    reset,
    formState: { isSubmitting, errors },
  } = form

  async function handleSendResetPassEmail(data: RecoveryPasswordFormValues) {
    console.log(data)

    reset()
  }

  const emailErr = errors.email?.message

  return (
    <form
      onSubmit={handleSubmit(handleSendResetPassEmail)}
      className="space-y-3 w-full"
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="jhondoe@gmail.com"
          disabled={isSubmitting}
          {...register('email')}
        />
        {emailErr && <FormError>{emailErr}</FormError>}
      </div>

      <Button disabled={isSubmitting} className="w-full">
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Send
      </Button>
    </form>
  )
}

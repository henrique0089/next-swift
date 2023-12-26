'use client'

import { Button } from '@/components/ui/button'
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
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordFormSchema),
    mode: 'onChange',
  })

  function handleUpdatePassword(data: UpdatePasswordFormValues) {
    console.log({ ...data })
  }

  return (
    <form onSubmit={handleSubmit(handleUpdatePassword)} className="space-y-8">
      <Input
        type="password"
        placeholder="current password"
        {...register('password')}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="password"
          placeholder="new password"
          {...register('newPass')}
        />

        <Input
          type="password"
          placeholder="new password confirmation"
          {...register('newPassConfirmation')}
        />
      </div>

      <Button disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Update password
      </Button>
    </form>
  )
}

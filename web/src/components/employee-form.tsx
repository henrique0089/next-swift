'use client'

import { useSignIn } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

const employeeAuthFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type EmployeeAuthFormValues = z.infer<typeof employeeAuthFormSchema>

export function EmployeeAuthForm() {
  const { isLoaded, signIn, setActive } = useSignIn()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<EmployeeAuthFormValues>({
    resolver: zodResolver(employeeAuthFormSchema),
  })

  async function handleSignIn({ email, password }: EmployeeAuthFormValues) {
    if (!isLoaded) return

    try {
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      })

      if (completeSignIn.status === 'complete') {
        await setActive({ session: completeSignIn.createdSessionId })

        window.location.href = '/dashboard'
      }
    } catch (err) {
      console.log(err)
    }
  }

  const emailErr = errors.email?.message
  const passErr = errors.password?.message

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className="space-y-2 w-full">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="jhondoe@gmail.com"
          disabled={isSubmitting}
          {...register('email')}
        />
        {emailErr && <span>{emailErr}</span>}
      </div>

      <div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="your password"
            disabled={isSubmitting}
            {...register('password')}
          />
          {passErr && <span>{passErr}</span>}
        </div>

        <Link
          href="/recovery-password"
          className="text-right mt-2 w-full block text-sm text-muted-foreground hover:underline underline-offset-4 hover:text-primary"
        >
          Forgot password?
        </Link>
      </div>

      <Button disabled={isSubmitting} className="w-full">
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Sign In
      </Button>
    </form>
  )
}

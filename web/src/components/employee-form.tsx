'use client'

import { useSignIn } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'

const employeeAuthFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type EmployeeAuthFormValues = z.infer<typeof employeeAuthFormSchema>

export function EmployeeAuthForm() {
  const { isLoaded, signIn, setActive } = useSignIn()

  const form = useForm<EmployeeAuthFormValues>({
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

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleSignIn)} className="space-y-2 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="name@example.com"
                  type="email"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="your password"
                    type="password"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
    </Form>
  )
}

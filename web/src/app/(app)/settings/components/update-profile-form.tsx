'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface ProfileFormProps {
  user: {
    firstName: string | null
    lastName: string | null
    avatar: string
  }
}

const profileFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function UpdateProfileForm() {
  const [avatar, setAvatar] = useState<FileList | null>(null)
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: 'Jhon',
      lastName: 'doe',
    },
  })

  function handleUpdateProfileInfo(data: ProfileFormValues) {
    console.log({ ...data, avatar })
  }

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleUpdateProfileInfo)}
        className="space-y-8"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <input
                type="file"
                className="sr-only"
                onChange={(e) => setAvatar(e.target.files)}
                id="avatar"
              />

              <label
                htmlFor="avatar"
                className="cursor-pointer hover:opacity-70"
              >
                {avatar ? (
                  <Image
                    src="/avatars/woman.png"
                    alt=""
                    width={64}
                    height={64}
                    className="w-20 lg:h-16  lg:w-16 rounded-full bg-primary/10"
                  />
                ) : (
                  <Image
                    src="/avatars/man.png"
                    alt=""
                    width={64}
                    height={64}
                    className="w-20 lg:h-16  lg:w-16 rounded-full bg-primary/10"
                  />
                )}
              </label>
              <div>
                <span className="text-lg font-medium">Your avatar</span>
                <p className="text-sm text-muted-foreground">
                  Click on the avatar to upload a custom one from your files.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
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
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update profile
        </Button>
      </form>
    </Form>
  )
}

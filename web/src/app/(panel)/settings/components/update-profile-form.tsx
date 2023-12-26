'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
    imageUrl: string
  }
}

const profileFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function UpdateProfileForm() {
  const [avatar, setAvatar] = useState<FileList | null>(null)
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<ProfileFormValues>({
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

  return (
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

            <label htmlFor="avatar" className="cursor-pointer hover:opacity-70">
              {avatar ? (
                <Image
                  src={avatar[0]}
                  alt=""
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full bg-primary/10"
                />
              ) : (
                <Image
                  src="/avatars/man.png"
                  alt=""
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full bg-primary/10"
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
        <Input placeholder="John" {...register('firstName')} />

        <Input placeholder="Doe" {...register('lastName')} />
      </div>

      <Button disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Update password
      </Button>
    </form>
  )
}

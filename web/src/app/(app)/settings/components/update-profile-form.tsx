'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const profileFormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

interface UpdateProfileFormProps {
  user: {
    firstName?: string | null
    lastName?: string | null
    avatar?: string
  }
}

export function UpdateProfileForm({ user }: UpdateProfileFormProps) {
  const [image, setImage] = useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: user.firstName ?? undefined,
      lastName: user?.lastName ?? undefined,
    },
  })

  async function handleUpdateProfileInfo(data: ProfileFormValues) {
    const formData = new FormData()

    formData.append('firstName', data.firstName ?? '')
    formData.append('lastName', data.lastName ?? '')

    if (image) {
      formData.append('avatar', image)
    }

    try {
      await axios.put('/api/employees/update-profile', formData)

      toast('Congratulations!', {
        description: 'you updated your profile info!',
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

  function handleSelectImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      const previewUrl = URL.createObjectURL(file)

      setImage(file)
      setImagePreviewUrl(previewUrl)
    }
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
              onChange={handleSelectImage}
              id="avatar"
            />

            <label htmlFor="avatar" className="cursor-pointer hover:opacity-70">
              {imagePreviewUrl ? (
                <Image
                  src={imagePreviewUrl}
                  alt=""
                  width={64}
                  height={64}
                  className="w-20 lg:h-16 object-cover lg:w-16 rounded-full bg-primary/10"
                />
              ) : (
                <Image
                  src={user?.avatar ?? ''}
                  alt=""
                  width={64}
                  height={64}
                  className="w-20 lg:h-16 object-cover lg:w-16 rounded-full bg-primary/10"
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
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" placeholder="John" {...register('firstName')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="Doe" {...register('lastName')} />
        </div>
      </div>

      <Button disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Update profile
      </Button>
    </form>
  )
}

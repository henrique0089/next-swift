import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { api } from '@/lib/axios'
import { useAuth } from '@clerk/nextjs'
import { AxiosError } from 'axios'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { ImageData } from './remove-images-content'

interface DeleteImageButtonProps {
  images: ImageData[]
  setImages: (images: ImageData[]) => void
  productId: string
  imageId: string
}

export function DeleteImageButton({
  images,
  setImages,
  productId,
  imageId,
}: DeleteImageButtonProps) {
  const { getToken } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  async function handleDeleteImage() {
    try {
      await api.patch(
        `products/${productId}/images/remove`,
        {
          imagesIds: [imageId],
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      )

      setImages(images.filter((img) => img.id !== imageId))
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log({ error: error.response?.data.message })
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

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <button>
          <Trash className="h-4 w-4 stroke-muted-foreground" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove this
            image.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteImage}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

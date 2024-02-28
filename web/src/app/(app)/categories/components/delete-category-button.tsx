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
import { useCategoriesStore } from '@/store/categories-store'
import { useAuth } from '@clerk/nextjs'
import { AxiosError } from 'axios'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface DeleteCategoryButtonProps {
  categoryId: string
  categoryName: string
}

export function DeleteCategoryButton({
  categoryId,
  categoryName,
}: DeleteCategoryButtonProps) {
  const { getToken } = useAuth()
  const { categories, setCategories } = useCategoriesStore()
  const [isOpen, setIsOpen] = useState(false)

  async function handleDeleCategory() {
    try {
      await api.delete(`/categories/${categoryId}/delete`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })

      const filteredCategories = categories.filter(
        (category) => category.id !== categoryId,
      )

      setCategories(filteredCategories)
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
            This action cannot be undone. This will permanently remove the
            category: <strong>{categoryName}</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleCategory}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

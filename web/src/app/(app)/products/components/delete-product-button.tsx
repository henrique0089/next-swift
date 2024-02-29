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
import { useProductsStore } from '@/store/products-store'
import { useAuth } from '@clerk/nextjs'
import { AxiosError } from 'axios'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface DeleteProductButtonProps {
  productId: string
}

export function DeleteProductButton({ productId }: DeleteProductButtonProps) {
  const { getToken } = useAuth()
  const { products, setProducts } = useProductsStore()

  async function handleRemoveProduct() {
    try {
      await api.delete(`/products/${productId}/remove`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })

      const filteredProducts = products.filter(
        (product) => product.id !== productId,
      )
      setProducts(filteredProducts)

      toast('Success!', {
        description: 'product removed from your catalog succesfuly.',
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

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button>
          <Trash2 className="h-5 w-5" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Please confirm that you really want to remove this product from the
            catalog. Don&apos;t worry, you can redeem it later if you wish.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemoveProduct}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

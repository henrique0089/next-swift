import { api } from '@/lib/axios'
import { auth } from '@clerk/nextjs'
import { UpdateProductForm } from '../../components/update-product-form'

interface UpdateProductProps {
  params: {
    id: string
  }
}

export type ProductResponseData = {
  id: string
  name: string
  description: string
  width: number
  height: number
  weight: number
  price: number
  quantity: number
}

export default async function UpdateProduct({
  params: { id },
}: UpdateProductProps) {
  const { getToken } = auth()

  const res = await api.get<{ product: ProductResponseData }>(
    `/products/${id}/details`,
    {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    },
  )

  return (
    <section className="min-h-screen max-w-6xl w-full mx-auto space-y-8 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Update Product</h1>
        <span className="block text-muted-foreground">
          Update a product present in your catalog.
        </span>
      </div>

      <UpdateProductForm product={res.data.product} />
    </section>
  )
}

import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'
import { auth } from '@clerk/nextjs'
import { Plus, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { ProductsContent } from './components/products-content'
import { ProductsDatePicker } from './components/products-date-picker'

export type ProductData = {
  id: string
  name: string
  desciption: string
  coverImage: string
  price: number
  quantity: number
}

export default async function Products() {
  const { getToken } = auth()

  const res = await api.get<{ products: ProductData[] }>('/products', {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  })

  return (
    <section className="relative min-h-screen space-y-8 p-6 max-w-6xl w-full mx-auto">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <span className="block text-muted-foreground">
            Manage your products.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <ProductsDatePicker />

          <Button asChild className="items-center gap-2 hidden lg:flex">
            <Link href="/products/add">
              <PlusCircle className="h-5 w-5" />
              <span>Add Product</span>
            </Link>
          </Button>
        </div>
      </div>

      <ProductsContent productsData={res.data.products} />

      <Button
        asChild
        className="fixed right-6 bottom-6 lg:hidden w-14 h-14 rounded-full"
      >
        <Link href="/products/add">
          <Plus />
        </Link>
      </Button>
    </section>
  )
}

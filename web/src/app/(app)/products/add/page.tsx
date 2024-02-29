import { api } from '@/lib/axios'
import { auth } from '@clerk/nextjs'
import { CategoryData } from '../../categories/page'
import { AddProductForm } from '../components/add-product-form'

export type CategoryOption = {
  value: string
  label: string
}

export default async function AddProduct() {
  const { getToken } = auth()

  const res = await api.get<{ categories: CategoryData[] }>('/categories', {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  })

  const categories: CategoryOption[] = res.data.categories.map((category) => {
    return {
      value: category.id,
      label: category.name,
    }
  })

  return (
    <section className="min-h-screen max-w-6xl w-full mx-auto space-y-8 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Add Product</h1>
        <span className="block text-muted-foreground">
          Add a new product to your catalog.
        </span>
      </div>

      <AddProductForm categories={categories} />
    </section>
  )
}

import { Separator } from '@/components/ui/separator'
import { api } from '@/lib/axios'
import { auth } from '@clerk/nextjs'
import { CategoriesTable } from './components/categories-table'
import { CreateCategoryForm } from './components/create-category-form'
import { SearchCategoryForm } from './components/search-categories-form'

export type CategoryData = {
  id: string
  name: string
  products: number
  createdAt: Date
}

export default async function Categories() {
  const { getToken } = auth()

  const res = await api.get<{ categories: CategoryData[] }>('/categories', {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  })

  return (
    <section className="min-h-screen max-w-6xl w-full mx-auto space-y-8 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <span className="block text-muted-foreground">
          Manage all of your categories.
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] lg:items-start space-y-8 lg:space-y-0 lg:space-x-4">
        <nav className="space-y-6">
          <CreateCategoryForm />

          <Separator />

          <SearchCategoryForm />
        </nav>

        <CategoriesTable categoriesData={res.data.categories} />
      </div>
    </section>
  )
}

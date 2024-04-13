import { AddCategoriesContent } from '../../components/add-categories-content'

export default function AddCategoriesToProduct() {
  return (
    <section className="relative min-h-screen space-y-8 p-6 max-w-6xl w-full mx-auto">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Product Categories
          </h1>
          <span className="block text-muted-foreground">
            Add categories to a product.
          </span>
        </div>
      </div>

      <AddCategoriesContent />
    </section>
  )
}

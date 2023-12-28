import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { CategoryCheckbox } from './components/category-checkbox'
import { ProductCard } from './components/product-card'
import { ProductsDatePicker } from './components/products-date-picker'
import { SearchProductsForm } from './components/search-products-form'

export default function Products() {
  return (
    <section className="relative min-h-screen space-y-8 p-6 max-w-6xl w-full mx-auto">
      <div className="flex items-center justify-between">
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

      <div className="grid grid-cols-[15rem_1fr] items-start gap-4">
        <nav className="space-y-6">
          <SearchProductsForm />

          <Separator />

          <div className="space-y-6">
            <span className="block text-sm font-semibold">Categories (5)</span>

            <div className="space-y-4">
              <CategoryCheckbox id="t_shirts" label="T-shirts" />
              <CategoryCheckbox id="shoes" label="Shoes" />
              <CategoryCheckbox id="black_shoes" label="Black shoes" />
              <CategoryCheckbox id="oculus" label="Oculus" />
              <CategoryCheckbox id="blue_shirts" label="Blue-shirts" />
            </div>
          </div>

          <Separator />
        </nav>

        <div className="flex flex-col items-center mx-auto max-w-6xl gap-4 lg:grid lg:grid-cols-3">
          {Array.from({ length: 20 }).map((_, i) => (
            <ProductCard key={i} />
          ))}
        </div>
      </div>

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

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { ProductCardSkeleton } from './components/product-card-skeleton'
import { ProductsDatePicker } from './components/products-date-picker'

export default function ProductsLoading() {
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

      <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] lg:items-start space-y-8 lg:space-y-0 lg:space-x-4">
        <nav className="space-y-6">
          <form className="space-y-2">
            <Label htmlFor="search-products">Search by any product</Label>
            <Input
              id="search-products"
              placeholder="white t-shirt..."
              disabled
            />
          </form>

          <Separator />

          <div className="space-y-2">
            <span className="block text-sm font-semibold">Categories</span>

            <div className="grid grid-cols-4 justify-between gap-4 lg:grid-cols-1 lg:justify-normal lg:space-y-4 lg:gap-0">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <span className="block text-sm font-semibold">Quantity</span>

            <Skeleton className="h-9 w-full" />
          </div>
        </nav>

        <div className="flex flex-col items-center mx-auto max-w-6xl gap-4 lg:grid lg:grid-cols-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

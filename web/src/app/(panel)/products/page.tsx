import { Button } from '@/components/ui/button';
import { Plus, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { CategoriesCarousel } from './components/categories-carousel';
import { ProductCard } from './components/product-card';
import { SearchProductsForm } from './components/search-products-form';

export default function Products() {
  return (
    <section className="relative min-h-screen flex flex-col gap-4 pb-6">
      <div className="border-b border-zinc-100 min-h-16 py-4 lg:py-0 px-6 flex items-center justify-between">
        <SearchProductsForm />

        <Button asChild className="items-center gap-2 hidden lg:flex">
          <Link href="/products/add">
            <PlusCircle className="h-5 w-5" />
            <span>Add Product</span>
          </Link>
        </Button>
      </div>

      <div className="h-16 px-4 lg:px-6 lg:max-w-[1024px] lg:mx-auto">
        <CategoriesCarousel />
      </div>

      <div className="px-6 flex flex-col items-center gap-6 lg:grid lg:grid-cols-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <ProductCard key={i} />
        ))}
      </div>

      <Button asChild className="fixed right-6 bottom-6 lg:hidden w-14 h-14 rounded-full">
        <Link href="/products/add">
          <Plus />
        </Link>
      </Button>
    </section>
  )
}
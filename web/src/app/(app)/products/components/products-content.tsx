'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useProductsStore } from '@/store/products-store'
import { useEffect } from 'react'
import { ProductData } from '../page'
import { CategoryCheckbox } from './category-checkbox'
import { ProductCard } from './product-card'
import { SearchProductsForm } from './search-products-form'

interface ProductsContentProps {
  productsData: ProductData[]
}

export function ProductsContent({ productsData }: ProductsContentProps) {
  const { products, setProducts } = useProductsStore()

  useEffect(() => {
    setProducts(productsData)
  }, [productsData, setProducts])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] lg:items-start space-y-8 lg:space-y-0 lg:space-x-4">
      <nav className="space-y-6">
        <div className="space-y-2">
          <span className="block text-sm font-semibold">
            Search by any products
          </span>
          <SearchProductsForm />
        </div>

        <Separator />

        <div className="space-y-2">
          <span className="block text-sm font-semibold">Categories (5)</span>

          <div className="grid grid-cols-4 justify-between gap-4 lg:grid-cols-1 lg:justify-normal lg:space-y-4 lg:gap-0">
            <CategoryCheckbox id="t_shirts" label="T-shirts" />
            <CategoryCheckbox id="shoes" label="Shoes" />
            <CategoryCheckbox id="black_shoes" label="Black shoes" />
            <CategoryCheckbox id="oculus" label="Oculus" />
            <CategoryCheckbox id="blue_shirts" label="Blue-shirts" />
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <span className="block text-sm font-semibold">Quantity</span>

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Nothing selected" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </nav>

      <div className="flex flex-col items-center mx-auto max-w-6xl gap-4 lg:grid lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </div>
  )
}

'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { api } from '@/lib/axios'
import { useProductsStore } from '@/store/products-store'
import { useAuth } from '@clerk/nextjs'
import { useEffect } from 'react'
import { CategoryData } from '../../categories/page'
import { ProductData } from '../page'
import { CategoryCheckbox } from './category-checkbox'
import { ProductCard } from './product-card'
import { SearchProductsForm } from './search-products-form'

interface ProductsContentProps {
  productsData: ProductData[]
  categoriesData: CategoryData[]
}

export function ProductsContent({
  productsData,
  categoriesData,
}: ProductsContentProps) {
  const { getToken } = useAuth()
  const { products, setProducts, dates, categories, setCategories } =
    useProductsStore()

  useEffect(() => {
    setProducts(productsData)
  }, [productsData, setProducts])

  useEffect(() => {
    async function getProducts() {
      const res = await api.get<{ products: ProductData[] }>('/products', {
        params: {
          startDate: dates?.from,
          endDate: dates?.to,
          categories: categories.map((category) => category.value),
        },
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })

      setProducts(res.data.products)
    }

    if (categories.length > 0) {
      getProducts()
    }
  }, [categories, dates?.from, dates?.to, getToken, setCategories, setProducts])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] lg:items-start space-y-8 lg:space-y-0 lg:space-x-4">
      <nav className="space-y-6">
        <SearchProductsForm onSearch={setProducts} />

        <Separator />

        <div className="space-y-2">
          <span className="block text-sm font-semibold">
            Categories ({categoriesData.length})
          </span>

          <div className="grid grid-cols-4 justify-between gap-4 lg:grid-cols-1 lg:justify-normal lg:space-y-4 lg:gap-0">
            {categoriesData.map((category) => (
              <CategoryCheckbox
                key={category.id}
                id={category.id}
                label={category.name}
                selected={categories}
                onUpdate={setCategories}
              />
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <span className="block text-sm font-semibold">ProductsQuantity</span>

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

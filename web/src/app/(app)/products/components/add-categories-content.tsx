'use client'

import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { CategoryOption } from '../add/page'
import { ProductData } from '../page'
import { AddCategoriesToProductForm } from './add-categories-to-product-form'
import { SearchCategoriesForm } from './search-categories-form'
import { SearchProductsForm } from './search-products-form'

export function AddCategoriesContent() {
  const [products, setProducts] = useState<ProductData[]>([])
  const [categories, setCategories] = useState<CategoryOption[]>([])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] lg:items-start space-y-8 lg:space-y-0 lg:space-x-4">
      <nav className="space-y-6">
        <SearchProductsForm onSearch={setProducts} />

        <Separator />

        <SearchCategoriesForm onSearch={setCategories} />
      </nav>

      <AddCategoriesToProductForm products={products} categories={categories} />
    </div>
  )
}

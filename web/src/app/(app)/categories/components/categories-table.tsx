'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useCategoriesStore } from '@/store/categories-store'
import { formatDate } from '@/utils/format-date'
import { useEffect } from 'react'
import { CategoryData } from '../page'
import { DeleteCategoryButton } from './delete-category-button'

interface CategoriesTableProps {
  categoriesData: CategoryData[]
}

export function CategoriesTable({ categoriesData }: CategoriesTableProps) {
  const { setCategories, categories } = useCategoriesStore()

  useEffect(() => {
    setCategories(categoriesData)
  }, [categoriesData, setCategories])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Products</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell>{category.id}</TableCell>
            <TableCell>{category.name}</TableCell>
            <TableCell>{category.products}</TableCell>
            <TableCell>{formatDate(category.createdAt)}</TableCell>
            <TableCell>
              <DeleteCategoryButton
                categoryId={category.id}
                categoryName={category.name}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

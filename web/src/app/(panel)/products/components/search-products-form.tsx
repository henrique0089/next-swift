'use client'

import { Input } from '@/components/ui/input'

export function SearchProductsForm() {
  return (
    <form className="w-full">
      <Input type="search" placeholder="white t-shirt..." />
    </form>
  )
}

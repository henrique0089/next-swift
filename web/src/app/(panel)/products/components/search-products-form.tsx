'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export function SearchProductsForm() {
  return (
    <form className="flex items-center w-full">
      <div className="flex items-center gap-2">
        <Input type="search" placeholder="white t-shirt..." />
        <Button>
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </form>
  )
}

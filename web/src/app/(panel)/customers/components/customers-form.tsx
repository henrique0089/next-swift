'use client'

import { Input } from '@/components/ui/input'

interface CustomersFormProps {
  placeholder?: string
}

export function CustomersForm({ placeholder }: CustomersFormProps) {
  return (
    <form className="flex items-center gap-2 w-full">
      <Input type="search" placeholder={placeholder} />
    </form>
  )
}

'use client'

import { Input } from '@/components/ui/input'

interface CustomersFormProps {
  placeholder?: string
}

export function CustomersForm({ placeholder }: CustomersFormProps) {
  return (
    <form className="w-full">
      <Input type="search" placeholder={placeholder} />
    </form>
  )
}

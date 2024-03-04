import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'
import { auth } from '@clerk/nextjs'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { SuppliersContent } from './components/suppliers-content'
import { SuppliersDatePicker } from './components/suppliers-date-picker'

export type SupplierData = {
  id: string
  name: string
  email: string
  cnpj: string
  ddd: number
  phone: number
  createdAt: Date
  updatedAt: Date | null
}

export default async function Suppliers() {
  const { getToken } = auth()

  const res = await api.get<{ suppliers: SupplierData[] }>('/suppliers', {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  })

  return (
    <section className="min-h-screen max-w-6xl w-full mx-auto space-y-8 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
          <span className="block text-muted-foreground">
            Manage all of your suppliers.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <SuppliersDatePicker />

          <Button asChild className="items-center gap-2 hidden lg:flex">
            <Link href="/suppliers/add">
              <PlusCircle className="h-5 w-5" />
              <span>Add Supplier</span>
            </Link>
          </Button>
        </div>
      </div>

      <SuppliersContent suppliersData={res.data.suppliers} />
    </section>
  )
}

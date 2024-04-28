import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'
import { auth } from '@clerk/nextjs'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { CustomersContent } from './components/customers-content'
import { CustomersDatePicker } from './components/customers-date-picker'

export type CustomerData = {
  id: string
  name: string
  email: string
  document: string
  ddd: number
  phone: number
  createdAt: Date
  updatedAt: Date | null
}

export type CustomersResponse = {
  customers: CustomerData[]
  totalCount: number
}

export default async function Customers() {
  const { getToken } = auth()

  const res = await api.get<CustomersResponse>('/customers', {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  })

  return (
    <section className="min-h-screen max-w-6xl w-full mx-auto space-y-8 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <span className="block text-muted-foreground">
            Manage all of your customers.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <CustomersDatePicker />

          <Button asChild className="items-center gap-2 hidden lg:flex">
            <Link href="/customers/add">
              <PlusCircle className="h-5 w-5" />
              <span>Add Customer</span>
            </Link>
          </Button>
        </div>
      </div>

      <CustomersContent
        customers={res.data.customers}
        totalCount={res.data.totalCount}
      />
    </section>
  )
}

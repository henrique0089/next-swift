import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'
import { auth } from '@clerk/nextjs'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { SalesContent } from './components/sales-content'
import { SalesDatePicker } from './components/sales-date-picker'

export type SaleData = {
  id: string
  total: number
  product: string
  quantiy: string
  paymentMethod: string
  status: string
  customer: string
}

export default async function Sales() {
  const { getToken } = auth()

  const res = await api.get<{ sales: SaleData[] }>('/sales', {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  })

  return (
    <section className="min-h-screen max-w-6xl w-full mx-auto space-y-8 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Sales</h1>
          <span className="block text-muted-foreground">
            Manage your sales.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <SalesDatePicker />

          <Button asChild className="items-center gap-2 hidden lg:flex">
            <Link href="/sales/add">
              <PlusCircle className="h-5 w-5" />
              <span>Add Sale</span>
            </Link>
          </Button>
        </div>
      </div>

      <SalesContent salesData={res.data.sales} />
    </section>
  )
}

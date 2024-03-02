import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { api } from '@/lib/axios'
import { useSalesStore } from '@/store/sales-store'
import { useAuth } from '@clerk/nextjs'
import { SaleData } from '../page'

export function PaymentStatusSelect() {
  const { getToken } = useAuth()
  const { setSales, paymentMethod, setStatus, dates, product, quantity } =
    useSalesStore()

  async function getSales(value: string) {
    const res = await api.get<{ sales: SaleData[] }>('/sales', {
      params: {
        startDate: dates?.from,
        endDate: dates?.to,
        search: product,
        paymentMethod,
        status: value,
        limit: quantity,
      },
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    })

    setSales(res.data.sales)
    setStatus(value)
  }

  return (
    <div className="space-y-2">
      <span className="block text-sm font-semibold">
        Select a payment status
      </span>
      <Select onValueChange={getSales}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Nothing selected" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="PAID">Paid</SelectItem>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="CANCELED">Cancelled</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

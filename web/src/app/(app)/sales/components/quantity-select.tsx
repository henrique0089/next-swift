/* eslint-disable react-hooks/exhaustive-deps */
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

export function QuantitySelect() {
  const { getToken } = useAuth()
  const { setSales, setQuantity, paymentMethod, status, dates, product } =
    useSalesStore()

  async function getSales(value: string) {
    const res = await api.get<{ sales: SaleData[] }>('/sales', {
      params: {
        startDate: dates?.from,
        endDate: dates?.to,
        search: product,
        paymentMethod,
        status,
        limit: value,
      },
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    })

    setSales(res.data.sales)
    setQuantity(value)
  }

  return (
    <div className="space-y-2">
      <span className="block text-sm font-semibold">Select a quantity</span>
      <Select onValueChange={getSales}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Nothing selected" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="15">15</SelectItem>
          <SelectItem value="20">20</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

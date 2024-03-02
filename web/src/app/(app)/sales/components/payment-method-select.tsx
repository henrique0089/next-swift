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

export function PaymentMethodSelect() {
  const { getToken } = useAuth()
  const { setSales, setPaymentMethod, dates, product, status, quantity } =
    useSalesStore()

  async function getSales(value: string) {
    const res = await api.get<{ sales: SaleData[] }>('/sales', {
      params: {
        startDate: dates?.from,
        endDate: dates?.to,
        search: product,
        paymentMethod: value,
        status,
        limit: quantity,
      },
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    })

    setSales(res.data.sales)
    setPaymentMethod(value)
  }

  return (
    <div className="space-y-2">
      <span className="block text-sm font-semibold">
        Select a payment method
      </span>
      <Select onValueChange={getSales}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Nothing selected" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="MONEY">Money</SelectItem>
          <SelectItem value="CREDIT">Credit card</SelectItem>
          <SelectItem value="DEBIT">Debit card</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

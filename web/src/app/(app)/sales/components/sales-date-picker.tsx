'use client'

import { DateRangePicker } from '@/components/date-range-picker'
import { api } from '@/lib/axios'
import { useSalesStore } from '@/store/sales-store'
import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { SaleData } from '../page'

export function SalesDatePicker() {
  const { getToken } = useAuth()
  const { setSales, setDates, product, paymentMethod, status, quantity } =
    useSalesStore()
  const [date, setDate] = useState<DateRange | undefined>()

  useEffect(() => {
    async function getSales() {
      const res = await api.get<{ sales: SaleData[] }>('/sales', {
        params: {
          startDate: date?.from,
          endDate: date?.to,
          search: product,
          paymentMethod,
          status,
          limit: quantity,
        },
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })

      setSales(res.data.sales)
    }

    if (date) {
      getSales()

      setDates(date)
    }
  }, [
    date,
    getToken,
    paymentMethod,
    product,
    quantity,
    setDates,
    setSales,
    status,
  ])

  return <DateRangePicker date={date} setDate={setDate} />
}

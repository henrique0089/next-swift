'use client'

import { DateRangePicker } from '@/components/date-range-picker'
import { api } from '@/lib/axios'
import { useCustomersStore } from '@/store/customers-store'
import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { CustomerData } from '../page'

export function CustomersDatePicker() {
  const [date, setDate] = useState<DateRange | undefined>()
  const { setCustomers, setDates } = useCustomersStore()
  const { getToken } = useAuth()

  useEffect(() => {
    async function getCustomers() {
      const res = await api.get<{ customers: CustomerData[] }>('/customers', {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
        params: {
          startDate: date?.from,
          endDate: date?.to,
        },
      })

      setDates({
        from: date?.from,
        to: date?.to,
      })

      setCustomers(res.data.customers)
    }

    getCustomers()
  }, [date?.from, date?.to, getToken, setDates, setCustomers])

  return <DateRangePicker date={date} setDate={setDate} />
}

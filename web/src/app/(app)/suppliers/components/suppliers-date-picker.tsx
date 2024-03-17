'use client'

import { DateRangePicker } from '@/components/date-range-picker'
import { api } from '@/lib/axios'
import { useSuppliersStore } from '@/store/suppliers-store'
import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { SupplierData } from '../page'

export function SuppliersDatePicker() {
  const [date, setDate] = useState<DateRange | undefined>()
  const { setDates, setSuppliers } = useSuppliersStore()
  const { getToken } = useAuth()

  useEffect(() => {
    async function getSuppliers() {
      const res = await api.get<{ suppliers: SupplierData[] }>('/suppliers', {
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
      setSuppliers(res.data.suppliers)
    }

    getSuppliers()
  }, [date?.from, date?.to, getToken, setDates, setSuppliers])

  return <DateRangePicker date={date} setDate={setDate} />
}

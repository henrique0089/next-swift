'use client'

import { DateRangePicker } from '@/components/date-range-picker'
import { api } from '@/lib/axios'
import { useProductsStore } from '@/store/products-store'
import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { ProductData } from '../page'

export function ProductsDatePicker() {
  const { categories, setProducts, setDates } = useProductsStore()
  const { getToken } = useAuth()
  const [date, setDate] = useState<DateRange | undefined>()

  useEffect(() => {
    async function getProducts() {
      const res = await api.get<{ products: ProductData[] }>('/products', {
        params: {
          startDate: date?.from,
          endDate: date?.to,
          categories,
        },
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })

      setProducts(res.data.products)
    }

    if (date) {
      getProducts()

      setDates(date)
    }
  }, [categories, date, getToken, setDates, setProducts])

  return <DateRangePicker date={date} setDate={setDate} />
}

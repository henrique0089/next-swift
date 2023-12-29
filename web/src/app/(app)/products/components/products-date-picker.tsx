'use client'

import { DateRangePicker } from '@/components/date-range-picker'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'

export function ProductsDatePicker() {
  const [date, setDate] = useState<DateRange | undefined>()

  return <DateRangePicker date={date} setDate={setDate} />
}

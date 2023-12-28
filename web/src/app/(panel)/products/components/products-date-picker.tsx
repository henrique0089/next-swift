'use client'

import { DateRangePicker } from '@/components/date-range-picker'
import { subMonths } from 'date-fns'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'

export function ProductsDatePicker() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subMonths(new Date(), 1),
    to: new Date(),
  })

  return <DateRangePicker date={date} setDate={setDate} />
}

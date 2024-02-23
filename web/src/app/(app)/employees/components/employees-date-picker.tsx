'use client'

import { DateRangePicker } from '@/components/date-range-picker'
import { api } from '@/lib/axios'
import { useEmployeesStore } from '@/store/employees-store'
import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { EmployeeData } from '../page'

export function EmployeesDatePicker() {
  const [date, setDate] = useState<DateRange | undefined>()
  const { setEmployees, setDates } = useEmployeesStore()
  const { getToken } = useAuth()

  useEffect(() => {
    async function getEmployees() {
      const res = await api.get<{ employees: EmployeeData[] }>('/employees', {
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

      setEmployees(res.data.employees)
    }

    getEmployees()
  }, [date?.from, date?.to, getToken, setDates, setEmployees])

  return <DateRangePicker date={date} setDate={setDate} />
}

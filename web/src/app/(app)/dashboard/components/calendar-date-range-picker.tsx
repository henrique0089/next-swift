'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { api } from '@/lib/axios'
import { cn } from '@/lib/utils'
import { useDashboardStore } from '@/store/dashboard-store'
import { useAuth } from '@clerk/nextjs'
import { AxiosError } from 'axios'
import { format } from 'date-fns'
import { CalendarIcon, DownloadIcon, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { toast } from 'sonner'
import { RevenueMetricsResponse } from '../page'

export function CalendarDateRangePicker() {
  const { getToken } = useAuth()
  const { setRevenueMetrics } = useDashboardStore()
  const [date, setDate] = useState<DateRange | undefined>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getChartMetrics() {
      const res = await api.get<RevenueMetricsResponse>('/metrics/revenue', {
        params: {
          startDate: date?.from,
          endDate: date?.to,
        },
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })

      setRevenueMetrics(res.data.revenueMetrics)
    }

    getChartMetrics()
  }, [date?.from, date?.to, getToken, setRevenueMetrics])

  async function generateReport() {
    try {
      setIsLoading(true)

      await api.get('/metrics/revenue/report', {
        params: {
          startDate: date?.from,
          endDate: date?.to,
        },
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        toast('Uh oh! Something went wrong.', {
          description: error.response?.data.message,
          position: 'bottom-right',
          dismissible: true,
          duration: 2000,
          cancel: {
            label: 'dismiss',
          },
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[260px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            disabled={(date) =>
              date > new Date() || date < new Date('1970-01-01')
            }
          />
        </PopoverContent>
      </Popover>

      <Button
        disabled={isLoading}
        onClick={generateReport}
        className="flex items-center gap-2"
      >
        <span>Download</span>{' '}
        {isLoading ? (
          <Loader2 className="animate-spin size-5" />
        ) : (
          <DownloadIcon className="h-5 w-5" />
        )}
      </Button>
    </div>
  )
}

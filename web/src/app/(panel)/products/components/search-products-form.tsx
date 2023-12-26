'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { format, subMonths } from 'date-fns'
import { CalendarIcon, Search } from 'lucide-react'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'

export function SearchProductsForm() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subMonths(new Date(), 1),
    to: new Date(),
  })

  return (
    <form className="flex flex-col items-center gap-2 lg:gap-4 lg:flex-row w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            type="button"
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
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
          />
        </PopoverContent>
      </Popover>

      <Separator orientation="vertical" className="h-6 hidden lg:block" />

      <div className="flex gap-2">
        <Input type="search" placeholder="white t-shirt..." />
        <Button className="flex items-center gap-2">
          <Search className="h-4 w-4" /> <span>Search</span>
        </Button>
      </div>
    </form>
  )
}
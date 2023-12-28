'use client'

import { DateRangePicker } from '@/components/date-range-picker'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatPrice } from '@/utils/format-price'
import { subMonths } from 'date-fns'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'

export function SalesContent() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subMonths(new Date(), 1),
    to: new Date(),
  })

  return (
    <>
      <div className="mt-9 max-w-[1024px] w-full mx-auto flex justify-end gap-2">
        <DateRangePicker date={date} setDate={setDate} />

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Quantity" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="max-w-[1024px] w-full mx-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Customer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 20 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>Black t-shirt: {i + 1}</TableCell>
                <TableCell>3</TableCell>
                <TableCell>{formatPrice(200 * 100)}</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell>
                  <Badge className="bg-emerald-500 hover:bg-emerald-500/80 rounded-full">
                    PAID
                  </Badge>
                </TableCell>
                <TableCell>Jhon Doe</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

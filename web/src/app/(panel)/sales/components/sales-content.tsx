'use client'

import { DateRangePicker } from '@/components/date-range-picker'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatPrice } from '@/utils/format-price'
import { Download } from 'lucide-react'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { SearchProductsForm } from '../../products/components/search-products-form'

export function SalesContent() {
  const [date, setDate] = useState<DateRange | undefined>()

  return (
    <div className="grid grid-cols-[16rem_1fr] items-start gap-4">
      <nav className="space-y-6">
        <div className="space-y-2">
          <span className="block text-sm font-semibold">
            Search by any product
          </span>
          <SearchProductsForm />
        </div>

        <Separator />

        <div className="space-y-2">
          <span className="block text-sm font-semibold">Date range</span>
          <DateRangePicker date={date} setDate={setDate} />
        </div>

        <Separator />

        <div className="space-y-2">
          <span className="block text-sm font-semibold">Select a quantity</span>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Nothing selected" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="space-y-2">
          <span className="block text-sm font-semibold">
            Select a payment method
          </span>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Nothing selected" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="MONEY">Money</SelectItem>
              <SelectItem value="CREDIT">Credit card</SelectItem>
              <SelectItem value="DEBIT">Debit card</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="space-y-2">
          <span className="block text-sm font-semibold">
            Select a payment status
          </span>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Nothing selected" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="PAID">Paid</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </nav>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Download className="h-5 w-5" />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-fit" align="end" forceMount>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Generate excel report</DropdownMenuItem>
                    <DropdownMenuItem>Generate pdf report</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableHead>
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
  )
}

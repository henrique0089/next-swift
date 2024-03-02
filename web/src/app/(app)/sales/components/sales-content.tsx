'use client'

import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useSalesStore } from '@/store/sales-store'
import { formatPrice } from '@/utils/format-price'
import { Download } from 'lucide-react'
import { useEffect } from 'react'
import { SaleData } from '../page'
import { PaymentMethodSelect } from './payment-method-select'
import { PaymentStatusSelect } from './payment-status-select'
import { QuantitySelect } from './quantity-select'
import { SearchSalesForm } from './search-sales-form'

interface SalesContentProps {
  salesData: SaleData[]
}

export function SalesContent({ salesData }: SalesContentProps) {
  const { sales, setSales } = useSalesStore()

  useEffect(() => {
    setSales(salesData)
  }, [salesData, setSales])

  return (
    <div className="grid grid-cols-[16rem_1fr] items-start gap-4">
      <nav className="space-y-6">
        <SearchSalesForm />

        <Separator />

        <PaymentMethodSelect />

        <Separator />

        <PaymentStatusSelect />

        <Separator />

        <QuantitySelect />
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
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Download className="h-5 w-5" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Download report</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
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
          {sales.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell>{sale.product}</TableCell>
              <TableCell>{sale.quantiy}</TableCell>
              <TableCell>{formatPrice(sale.total)}</TableCell>
              <TableCell>{sale.paymentMethod}</TableCell>
              <TableCell>
                <Badge className="bg-emerald-500 hover:bg-emerald-500/80 rounded-full">
                  {sale.status}
                </Badge>
              </TableCell>
              <TableCell>{sale.customer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

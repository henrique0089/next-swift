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
import { api } from '@/lib/axios'
import { useSalesStore } from '@/store/sales-store'
import { DownloadFile } from '@/utils/download-file'
import { formatPrice } from '@/utils/format-price'
import { useAuth } from '@clerk/nextjs'
import { AxiosError } from 'axios'
import { Download } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { SaleData } from '../page'
import { PaymentMethodSelect } from './payment-method-select'
import { PaymentStatusSelect } from './payment-status-select'
import { QuantitySelect } from './quantity-select'
import { SearchSalesForm } from './search-sales-form'

interface SalesContentProps {
  salesData: SaleData[]
}

export function SalesContent({ salesData }: SalesContentProps) {
  const { sales, setSales, dates } = useSalesStore()
  const { getToken } = useAuth()

  useEffect(() => {
    setSales(salesData)
  }, [salesData, setSales])

  async function handleGenerateReport(type: 'excel' | 'pdf') {
    if (!dates) {
      toast('Uh oh! Something went wrong.', {
        description: 'Select an valid date interval!',
        position: 'bottom-right',
        dismissible: true,
        duration: 2000,
        cancel: {
          label: 'dismiss',
        },
      })
      return
    }

    try {
      const res = await api.get(`/sales/report/${type}`, {
        params: {
          startDate: dates.from,
          endDate: dates.to,
        },
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })

      const fileName = res.headers['x-filename']

      DownloadFile(res.data, fileName)
    } catch (error) {
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
    }
  }

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
                    <DropdownMenuItem
                      onClick={() => handleGenerateReport('excel')}
                    >
                      Generate excel report
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleGenerateReport('pdf')}
                    >
                      Generate pdf report
                    </DropdownMenuItem>
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

'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { Download, Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { SaleData } from '../page'
import { PaymentMethodSelect } from './payment-method-select'
import { PaymentStatusSelect } from './payment-status-select'
import { QuantitySelect } from './quantity-select'
import { SearchSalesForm } from './search-sales-form'

const updateStatusFormSchema = z.object({
  status: z.enum(['PAID', 'PENDING', 'CANCELED']),
})

type UpdateStatusFormValues = z.infer<typeof updateStatusFormSchema>

interface SalesContentProps {
  salesData: SaleData[]
}

export function SalesContent({ salesData }: SalesContentProps) {
  const { sales, setSales, setSaleStatus, dates } = useSalesStore()
  const { getToken } = useAuth()
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<UpdateStatusFormValues>({
    resolver: zodResolver(updateStatusFormSchema),
  })

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

  async function handleUpdateStatus(id: string, data: UpdateStatusFormValues) {
    try {
      await api.patch(
        `/sales/${id}/update-status`,
        {
          status: data.status,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      )

      setSaleStatus(id, data.status)
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
                <Sheet>
                  <SheetTrigger>
                    <Badge
                      data-status={sale.status}
                      className="data-[status=PAID]:bg-emerald-500 data-[status=PAID]:hover:bg-emerald-500/80 data-[status=PENDING]:bg-yellow-500 data-[status=PENDING]:hover:bg-yellow-500/80 data-[status=CANCELED]:bg-red-500 data-[status=CANCELED]:hover:bg-red-500/80 rounded-full select-none"
                    >
                      {sale.status}
                    </Badge>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Edit Status</SheetTitle>
                      <SheetDescription>
                        Status: {sale.status}. Click save when you&apos;re done.
                      </SheetDescription>
                    </SheetHeader>
                    <form
                      onSubmit={handleSubmit((data) =>
                        handleUpdateStatus(sale.id, data),
                      )}
                      className="grid gap-4 py-4"
                    >
                      <div className="space-y-2">
                        <Label>Select a payment status</Label>
                        <Controller
                          control={control}
                          name="status"
                          render={({ field }) => {
                            return (
                              <Select
                                defaultValue={sale.status}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Nothing selected" />
                                </SelectTrigger>

                                <SelectContent>
                                  <SelectItem value="PENDING">
                                    PENDING
                                  </SelectItem>
                                  <SelectItem value="PAID">PAID</SelectItem>
                                  <SelectItem value="CANCELED">
                                    CANCELED
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            )
                          }}
                        />
                      </div>

                      <Button disabled={isSubmitting}>
                        Save changes{' '}
                        {isSubmitting && (
                          <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                        )}
                      </Button>
                    </form>
                  </SheetContent>
                </Sheet>
              </TableCell>
              <TableCell>{sale.customer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

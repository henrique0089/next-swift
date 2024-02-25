'use client'

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
import { api } from '@/lib/axios'
import { useCustomersStore } from '@/store/customers-store'
import { formatDate } from '@/utils/format-date'
import { useAuth } from '@clerk/nextjs'
import { Pen, Trash } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CustomerData } from '../page'
import { CustomersForm } from './customers-form'
import { DeleteCustomerButton } from './delete-customer-button'

interface CustomersContentProps {
  customers: CustomerData[]
}

export function CustomersContent({ customers }: CustomersContentProps) {
  const { getToken } = useAuth()
  const { customers: customersData, dates, setCustomers } = useCustomersStore()
  const [quantityInString, setQuantityInString] = useState('')

  useEffect(() => {
    setCustomers(customers)
  }, [customers, setCustomers])

  useEffect(() => {
    async function getCustomersByQuantity() {
      const res = await api.get<{ customers: CustomerData[] }>('/customers', {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
        params: {
          limit: quantityInString,
          startDate: dates?.from,
          endDate: dates?.to,
        },
      })

      setCustomers(res.data.customers)
    }

    if (quantityInString) {
      getCustomersByQuantity()
    }
  }, [dates?.from, dates?.to, getToken, quantityInString, setCustomers])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] lg:items-start space-y-8 lg:space-y-0 lg:space-x-4">
      <nav className="space-y-6">
        <div className="space-y-2">
          <span className="block text-sm font-semibold">
            Search by any customer
          </span>
          <CustomersForm placeholder="Jhon doe" />
        </div>

        <Separator />

        <div className="space-y-2">
          <span className="block text-sm font-semibold">
            Search by any e-mail
          </span>
          <CustomersForm placeholder="jhondoe@gmail.com" />
        </div>

        <Separator />

        <div className="space-y-2">
          <span className="block text-sm font-semibold">Search by any cpf</span>
          <CustomersForm placeholder="000.000.000-00" />
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
      </nav>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>DDD</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Updated at</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customersData.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.document}</TableCell>
              <TableCell>{customer.ddd}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>{formatDate(customer.createdAt)}</TableCell>
              <TableCell>
                {customer.updatedAt
                  ? formatDate(customer.updatedAt)
                  : 'Not updated'}
              </TableCell>
              <TableCell>
                <Link
                  href={`/customers/${customer.id}/edit`}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <Pen className="h-4 w-4 stroke-muted-foreground group-hover:stroke-zinc-900" />
                </Link>
              </TableCell>
              <TableCell>
                <DeleteCustomerButton customerName={customer.name}>
                  <button className="flex items-center gap-2">
                    <Trash className="h-4 w-4 stroke-muted-foreground group-hover:stroke-zinc-900" />
                  </button>
                </DeleteCustomerButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

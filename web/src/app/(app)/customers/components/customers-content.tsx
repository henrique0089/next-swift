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
import { Pen, Trash } from 'lucide-react'
import Link from 'next/link'
import { CustomersForm } from './customers-form'
import { DeleteCustomerButton } from './delete-customer-button'

export function CustomersContent() {
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
          {Array.from({ length: 10 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>Jhon doe: {i + 1}</TableCell>
              <TableCell>jhondoe@gmail.com</TableCell>
              <TableCell>134.607.374-09</TableCell>
              <TableCell>82</TableCell>
              <TableCell>9 9944-0567</TableCell>
              <TableCell>28/12/2023</TableCell>
              <TableCell>29/12/2023</TableCell>
              <TableCell>
                <Link
                  href={`/customers/123/edit`}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <Pen className="h-4 w-4 stroke-muted-foreground group-hover:stroke-zinc-900" />
                </Link>
              </TableCell>
              <TableCell>
                <DeleteCustomerButton customerName={'Jhon doe'}>
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

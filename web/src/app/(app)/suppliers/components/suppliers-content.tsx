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
import { useSuppliersStore } from '@/store/suppliers-store'
import { formatDate } from '@/utils/format-date'
import { useAuth } from '@clerk/nextjs'
import { Pen, Trash } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SupplierData } from '../page'
import { DeleteSupplierButton } from './delete-suppliers-button'
import { SearchByCnpjForm } from './search-by-cnpj-form'
import { SearchByEmailForm } from './search-by-email-form'
import { SearchBySupplierForm } from './search-supplier-form'

interface SuppliersContentProps {
  suppliersData: SupplierData[]
}

export function SuppliersContent({ suppliersData }: SuppliersContentProps) {
  const { getToken } = useAuth()
  const { suppliers, dates, setSuppliers } = useSuppliersStore()
  const [quantityInString, setQuantityInString] = useState('')

  useEffect(() => {
    setSuppliers(suppliersData)
  }, [suppliersData, setSuppliers])

  useEffect(() => {
    async function getSuppliersByQuantity() {
      const res = await api.get<{ suppliers: SupplierData[] }>('/suppliers', {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
        params: {
          limit: quantityInString,
          startDate: dates?.from,
          endDate: dates?.to,
        },
      })

      setSuppliers(res.data.suppliers)
    }

    if (quantityInString) {
      getSuppliersByQuantity()
    }
  }, [dates?.from, dates?.to, getToken, quantityInString, setSuppliers])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] lg:items-start space-y-8 lg:space-y-0 lg:space-x-4">
      <nav className="space-y-6">
        <SearchBySupplierForm />

        <Separator />

        <SearchByEmailForm />

        <Separator />

        <SearchByCnpjForm />

        <Separator />

        <div className="space-y-2">
          <span className="block text-sm font-semibold">Select a quantity</span>
          <Select onValueChange={setQuantityInString}>
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
            <TableHead>CNPJ</TableHead>
            <TableHead>DDD</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Updated at</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow key={supplier.id}>
              <TableCell>{supplier.name}</TableCell>
              <TableCell>{supplier.email}</TableCell>
              <TableCell>{supplier.cnpj}</TableCell>
              <TableCell>{supplier.ddd}</TableCell>
              <TableCell>{supplier.phone}</TableCell>
              <TableCell>{formatDate(supplier.createdAt)}</TableCell>
              <TableCell>
                {supplier.updatedAt
                  ? formatDate(supplier.updatedAt)
                  : 'Not updated yet.'}
              </TableCell>
              <TableCell>
                <Link
                  href={`/suppliers/${supplier.id}/edit`}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <Pen className="h-4 w-4 stroke-muted-foreground group-hover:stroke-zinc-900" />
                </Link>
              </TableCell>
              <TableCell>
                <DeleteSupplierButton supplierName={supplier.name}>
                  <button className="flex items-center gap-2">
                    <Trash className="h-4 w-4 stroke-muted-foreground group-hover:stroke-zinc-900" />
                  </button>
                </DeleteSupplierButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

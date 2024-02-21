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
import { useAuth } from '@clerk/nextjs'
import { Ban } from 'lucide-react'
import { useEffect } from 'react'
import { DismissEmployeeButton } from './dismiss-employee-button'
import { EmployeesForm } from './employees-form'

export function EmployeesContent() {
  const { getToken } = useAuth()

  useEffect(() => {
    async function getEmp() {
      const res = await api.get('/employees', {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })

      console.log(res.data)
    }

    getEmp()
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] lg:items-start space-y-8 lg:space-y-0 lg:space-x-4">
      <nav className="space-y-6">
        <div className="space-y-2">
          <span className="block text-sm font-semibold">
            Search by any customer
          </span>
          <EmployeesForm placeholder="Jhon doe" />
        </div>

        <Separator />

        <div className="space-y-2">
          <span className="block text-sm font-semibold">
            Search by any e-mail
          </span>
          <EmployeesForm placeholder="jhondoe@gmail.com" />
        </div>

        <Separator />

        <div className="space-y-2">
          <span className="block text-sm font-semibold">Search by any cpf</span>
          <EmployeesForm placeholder="000.000.000-00" />
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
            <TableHead>Number</TableHead>
            <TableHead>Registered in</TableHead>
            <TableHead>Updated at</TableHead>
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
                <DismissEmployeeButton employeeName={'Jhon doe'}>
                  <button className="flex items-center gap-2">
                    <Ban className="h-4 w-4 stroke-muted-foreground group-hover:stroke-zinc-900" />
                  </button>
                </DismissEmployeeButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

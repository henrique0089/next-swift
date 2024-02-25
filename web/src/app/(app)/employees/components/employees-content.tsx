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
import { useEmployeesStore } from '@/store/employees-store'
import { formatDate } from '@/utils/format-date'
import { useAuth } from '@clerk/nextjs'
import { Ban } from 'lucide-react'
import { useEffect, useState } from 'react'
import { EmployeeData } from '../page'
import { DismissEmployeeButton } from './dismiss-employee-button'
import { SearchByEmailForm } from './search-by-email-form'
import { SearchByEmployeeForm } from './search-by-employee-form'

interface EmployeesContentProps {
  employees: EmployeeData[]
}

export function EmployeesContent({ employees }: EmployeesContentProps) {
  const { getToken, userId } = useAuth()
  const { employees: employeesData, dates, setEmployees } = useEmployeesStore()
  const [quantityInString, setQuantityInString] = useState('')

  useEffect(() => {
    setEmployees(employees)
  }, [employees, setEmployees])

  useEffect(() => {
    async function getEmployeesByQuantity() {
      const res = await api.get<{ employees: EmployeeData[] }>('/employees', {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
        params: {
          limit: quantityInString,
          startDate: dates?.from,
          endDate: dates?.to,
        },
      })

      setEmployees(res.data.employees)
    }

    if (quantityInString) {
      getEmployeesByQuantity()
    }
  }, [dates?.from, dates?.to, getToken, quantityInString, setEmployees])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] lg:items-start space-y-8 lg:space-y-0 lg:space-x-4">
      <nav className="space-y-6">
        <div className="space-y-2">
          <span className="block text-sm font-semibold">
            Search by any customer
          </span>
          <SearchByEmployeeForm />
        </div>

        <Separator />

        <div className="space-y-2">
          <span className="block text-sm font-semibold">
            Search by any e-mail
          </span>
          <SearchByEmailForm />
        </div>

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
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>DDD</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Updated at</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employeesData.map((employee) => {
            const employeeName = `${employee.firstName} ${employee.lastName}`
            const employeeEmailMatches =
              userId && userId === employee.externalId
            return (
              <TableRow key={employee.id}>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.ddd}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{formatDate(employee.createdAt)}</TableCell>
                <TableCell>
                  {employee.updatedAt
                    ? formatDate(employee.updatedAt)
                    : 'Not updated'}
                </TableCell>
                <TableCell>
                  {!employeeEmailMatches && (
                    <DismissEmployeeButton employeeName={employeeName}>
                      <button className="flex items-center gap-2">
                        <Ban className="h-4 w-4 stroke-muted-foreground group-hover:stroke-zinc-900" />
                      </button>
                    </DismissEmployeeButton>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

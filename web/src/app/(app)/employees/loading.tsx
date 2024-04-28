import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { PlusCircle } from 'lucide-react'
import { EmployeesDatePicker } from './components/employees-date-picker'
import { EmployeesTableSkeleton } from './components/employees-table-skeleton'

export default function EmployeesLoading() {
  return (
    <section className="min-h-screen max-w-6xl w-full mx-auto space-y-8 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
          <span className="block text-muted-foreground">
            Manage all of your employees.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <EmployeesDatePicker />

          <Button disabled className="items-center gap-2 hidden lg:flex">
            <PlusCircle className="h-5 w-5" />
            <span>Hire an employee</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] lg:items-start space-y-8 lg:space-y-0 lg:space-x-4">
        <nav className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-9 w-full" />
          </div>

          <Separator />

          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-9 w-full" />
          </div>

          <Separator />

          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-9 w-full" />
          </div>
        </nav>

        <EmployeesTableSkeleton />
      </div>
    </section>
  )
}

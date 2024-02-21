import { Button } from '@/components/ui/button'
import { auth } from '@clerk/nextjs'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { EmployeesContent } from './components/employees-content'
import { EmployeesDatePicker } from './components/employees-date-picker'

export default async function Employees() {
  const { getToken } = auth()

  // const res = await api.get('/employees', {
  //   headers: {
  //     Authorization: `Bearer ${await getToken()}`,
  //   },
  // })

  // console.log(res.data)

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

          <Button asChild className="items-center gap-2 hidden lg:flex">
            <Link href="/employees/hire">
              <PlusCircle className="h-5 w-5" />
              <span>Hire an employee</span>
            </Link>
          </Button>
        </div>
      </div>

      <EmployeesContent />
    </section>
  )
}

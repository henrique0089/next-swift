import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { PlusCircle } from 'lucide-react'
import { SalesDatePicker } from './components/sales-date-picker'
import { SalesTableSkeleton } from './components/sales-table-skeleton'

export default function SalesLoading() {
  return (
    <section className="min-h-screen max-w-6xl w-full mx-auto space-y-8 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Sales</h1>
          <span className="block text-muted-foreground">
            Manage your sales.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <SalesDatePicker />

          <Button disabled className="items-center gap-2 hidden lg:flex">
            <PlusCircle className="h-5 w-5" />
            <span>Add Sale</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-[16rem_1fr] items-start gap-4">
        <nav className="space-y-6">
          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-9 w-full" />
          </div>

          <Separator />

          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-9 w-full" />
          </div>

          <Separator />

          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-9 w-full" />
          </div>

          <Separator />

          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-9 w-full" />
          </div>
        </nav>

        <SalesTableSkeleton />
      </div>
    </section>
  )
}

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export function RevenueChartLoader() {
  return (
    <Card className="col-span-6 relative">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Revenue in the period
          </CardTitle>
          <CardDescription>Daily revenue in the period</CardDescription>
        </div>
      </CardHeader>
      <div className="flex flex-col items-center justify-end gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="text-muted-foreground">Looking for data.</span>
      </div>
    </Card>
  )
}

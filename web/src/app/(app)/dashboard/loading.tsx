import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CalendarDateRangePicker } from './components/calendar-date-range-picker'
import { MetricCardSkeleton } from './components/metric-card-skeleton'
import { RecentSalesCardSkeleton } from './components/recent-sales-card-skeleton'
import { RevenueChartLoader } from './components/revenue-chart-skeleton'

export default function DashboardLoading() {
  return (
    <section className="p-4 lg:p-6 space-y-4">
      <div className="flex flex-col gap-2 lg:justify-between lg:flex-row lg:items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <CalendarDateRangePicker />
      </div>

      {/* <div className="lg:hidden">
        <MetricsCarousel />
      </div> */}

      <div className="grid-cols-4 gap-4 hidden lg:grid">
        <MetricCardSkeleton />
        <MetricCardSkeleton />
        <MetricCardSkeleton />
        <MetricCardSkeleton />
      </div>

      <div className="gap-4 grid grid-cols-1 lg:grid-cols-9">
        <RevenueChartLoader />

        <Card className="col-span-6 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Sale</CardTitle>
            <CardDescription>
              Looking for sales data for this month.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <RecentSalesCardSkeleton />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

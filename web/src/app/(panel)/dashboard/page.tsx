import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDateRangePicker } from './components/calendar-date-range-picker';
import { MonthCanceledSalesAmountCard } from './components/month-canceled-sales-card';
import { MonthRevenueCard } from './components/month-revenue-card';
import { NewCustomersAmountCard } from './components/new-customers-amount-card';
import { RecentSalesCard } from './components/recent-sales-card';
import { RevenueChart } from './components/revenue-chart';
import { TodaySalesAmountCard } from './components/today-sales-amount-card';

export default function Dashboard() {
  return (
    <section className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <CalendarDateRangePicker />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <MonthRevenueCard />
        <TodaySalesAmountCard />
        <MonthCanceledSalesAmountCard />
        <NewCustomersAmountCard />
      </div>

      <div className="grid grid-cols-9 gap-4">
        <RevenueChart />
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sale</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>

          <CardContent>
            <RecentSalesCard />
          </CardContent>
        </Card>
      </div>

    </section>
  )
}
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { api } from '@/lib/axios'
import { auth } from '@clerk/nextjs'
import { CalendarDateRangePicker } from './components/calendar-date-range-picker'
import { MetricsCarousel } from './components/metrics-carousel'
import { MonthCanceledSalesAmountCard } from './components/month-canceled-sales-card'
import { MonthRevenueCard } from './components/month-revenue-card'
import { NewCustomersAmountCard } from './components/new-customers-amount-card'
import { RecentSalesCard } from './components/recent-sales-card'
import { RevenueChart } from './components/revenue-chart'
import { TodaySalesAmountCard } from './components/today-sales-amount-card'

interface MetricsResponse {
  metrics: {
    salesCurrentMonthTotal: number
    salesCurrentMonthPercentageIncrease: number
    salesTodayTotalCount: number
    salesTodayPercentageIncrease: number
    canceledSalesTotalCount: number
    canceledSalesPercentageIncrease: number
    customersCurrentMonthTotalCount: number
    customersPercentageIncrease: number
  }
}

export type Revenue = {
  date: Date
  revenue: number
}

interface RevenueMetricsResponse {
  revenueMetrics: Revenue[]
}

export type RecentSale = {
  id: string
  total: number
  product: string
  quantiy: number
  paymentMethod: string
  status: string
  customer: string
}

interface RecentSaleResponse {
  sales: RecentSale[]
}

export default async function Dashboard() {
  const { getToken } = auth()

  const token = await getToken()

  async function getCardsMetrics() {
    const res = await api.get<MetricsResponse>('/metrics/cards', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return res.data.metrics
  }

  async function getChartMetrics() {
    const res = await api.get<RevenueMetricsResponse>('/metrics/revenue', {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    })

    return res.data.revenueMetrics
  }

  async function getRecentSales() {
    const res = await api.get<RecentSaleResponse>('/sales/recent', {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    })

    return res.data.sales
  }

  const [cardsMetrics, chartMetrics, recentSales] = await Promise.all([
    getCardsMetrics(),
    getChartMetrics(),
    getRecentSales(),
  ])

  const currentMonthRevenue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cardsMetrics.salesCurrentMonthTotal)

  return (
    <section className="p-4 lg:p-6 space-y-4">
      <div className="flex flex-col gap-2 lg:justify-between lg:flex-row lg:items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <CalendarDateRangePicker />
      </div>

      <div className="lg:hidden">
        <MetricsCarousel />
      </div>

      <div className="grid-cols-4 gap-4 hidden lg:grid">
        <MonthRevenueCard
          total={currentMonthRevenue}
          percentageIncrease={cardsMetrics.salesCurrentMonthPercentageIncrease}
        />
        <TodaySalesAmountCard
          count={cardsMetrics.salesTodayTotalCount}
          percentageIncrease={cardsMetrics.salesTodayPercentageIncrease}
        />
        <MonthCanceledSalesAmountCard
          count={cardsMetrics.canceledSalesTotalCount}
          percentageIncrease={cardsMetrics.canceledSalesPercentageIncrease}
        />
        <NewCustomersAmountCard
          count={cardsMetrics.customersCurrentMonthTotalCount}
          percentageIncrease={cardsMetrics.customersPercentageIncrease}
        />
      </div>

      <div className="gap-4 grid grid-cols-1 lg:grid-cols-9">
        <RevenueChart revenueMetrics={chartMetrics} />

        <Card className="col-span-6 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Sale</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>

          <CardContent>
            {recentSales.length > 0 ? (
              <RecentSalesCard sales={recentSales} />
            ) : (
              <div className="flex items-center justify-center">
                <h2>No recent sales</h2>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

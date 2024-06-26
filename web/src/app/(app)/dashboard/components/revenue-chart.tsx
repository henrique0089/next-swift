'use client'

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useDashboardStore } from '@/store/dashboard-store'
import { formatPrice } from '@/utils/format-price'
import { useAuth } from '@clerk/nextjs'
import { useEffect } from 'react'
import { Revenue } from '../page'

interface RevenueChartProps {
  revenueMetricsData: Revenue[]
}

export function RevenueChart({ revenueMetricsData }: RevenueChartProps) {
  const { getToken } = useAuth()
  const { revenueMetrics, setRevenueMetrics } = useDashboardStore()

  useEffect(() => {
    setRevenueMetrics(revenueMetricsData)
  }, [getToken, revenueMetricsData, setRevenueMetrics])

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Revenue in the period
          </CardTitle>
          <CardDescription>Daily revenue in the period</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {revenueMetrics.length > 0 ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={revenueMetrics} style={{ fontSize: 12 }}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} dy={16} />
              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={80}
                tickFormatter={formatPrice}
              />
              <CartesianGrid vertical={false} className="stroke-muted" />
              <Line
                stroke={colors.zinc[900]}
                type="linear"
                strokeWidth={2}
                dataKey="revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center">
            <h2>No revenue data</h2>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

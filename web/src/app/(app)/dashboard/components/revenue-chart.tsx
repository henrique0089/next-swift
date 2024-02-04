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
import { api } from '@/lib/axios'
import { formatPrice } from '@/utils/format-price'
import { useAuth } from '@clerk/nextjs'
import { useEffect } from 'react'

const data = [
  { date: '10/12', revenue: 1200 * 100 },
  { date: '11/12', revenue: 800 * 100 },
  { date: '12/12', revenue: 900 * 100 },
  { date: '13/12', revenue: 400 * 100 },
  { date: '14/12', revenue: 2300 * 100 },
  { date: '15/12', revenue: 800 * 100 },
  { date: '16/12', revenue: 640 * 100 },
]

export function RevenueChart() {
  const { getToken } = useAuth()

  useEffect(() => {
    async function getChartMetrics() {
      const res = await api.get('/metrics/revenue', {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })

      console.log(res.data)
    }

    getChartMetrics()
  }, [getToken])

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
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
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
      </CardContent>
    </Card>
  )
}

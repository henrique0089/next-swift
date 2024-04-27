import { Users2 } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface NewCustomersAmountCardProps {
  count: number
  percentageIncrease: number
}

export function NewCustomersAmountCard({
  count,
  percentageIncrease,
}: NewCustomersAmountCardProps) {
  const isIncreasePositive = percentageIncrease > 0
  const isIncreaseNegative = percentageIncrease < 0

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Customers (month)
        </CardTitle>
        <Users2 className="h-4 w-4 stroke-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">{count}</span>
        <p className="text-xs text-muted-foreground">
          <span
            data-increase-positive={isIncreasePositive}
            data-increase-negative={isIncreaseNegative}
            className="data-[increase-positive=true]:text-emerald-500 data-[increase-positive=true]:dark:text-emerald-400 data-[increase-negative=true]:text-red-500 data-[increase-negative=true]:dark:text-red-500"
          >
            {isIncreasePositive
              ? `+${percentageIncrease}%`
              : `${percentageIncrease}%`}
          </span>{' '}
          from last month
        </p>
      </CardContent>
    </Card>
  )
}

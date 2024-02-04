import { ShoppingBag } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface MonthCanceledSalesAmountCardProps {
  count: number
  percentageIncrease: number
}

export function MonthCanceledSalesAmountCard({
  count,
  percentageIncrease,
}: MonthCanceledSalesAmountCardProps) {
  const isIncreasePositive = percentageIncrease >= 0

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Sales Cancellations (month)
        </CardTitle>
        <ShoppingBag className="h-4 w-4 stroke-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">{count}</span>
        <p className="text-xs text-muted-foreground">
          <span
            data-positive={isIncreasePositive}
            className="data-[positive=true]:text-emerald-500 data-[positive=true]:dark:text-emerald-400 data-[positive=false]:text-red-500 data-[positive=false]:dark:text-red-500"
          >
            {isIncreasePositive
              ? `+${percentageIncrease}%`
              : `-${percentageIncrease}%`}
          </span>{' '}
          from last month
        </p>
      </CardContent>
    </Card>
  )
}

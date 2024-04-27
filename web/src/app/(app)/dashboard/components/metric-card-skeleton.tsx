import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function MetricCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>
          <Skeleton className="h-4 w-16" />
        </CardTitle>
        <Skeleton className="h-4 w-4" />
      </CardHeader>
      <CardContent className="mt-4 space-y-1">
        <Skeleton className="h-6 w-6" />
        <Skeleton className="h-4 w-36" />
      </CardContent>
    </Card>
  )
}

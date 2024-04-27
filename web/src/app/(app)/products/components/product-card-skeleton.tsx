import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export function ProductCardSkeleton() {
  return (
    <Card className="w-full max-w-[298px]">
      <Skeleton className="h-[9.5rem] w-full" />

      <CardHeader>
        <CardTitle>
          <Skeleton className="h-3 w-full" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-3 w-28" />
        </CardDescription>
      </CardHeader>

      <div className="px-4">
        <Separator />
      </div>
    </Card>
  )
}

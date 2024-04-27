import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export function ProductCardSkeleton() {
  return (
    <Card className="w-full max-w-[298px]">
      <Skeleton className="h-[9.5rem] w-full rounded-none" />

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

      <CardFooter className="flex items-center justify-between p-4">
        <Skeleton className="h-4 w-16" />

        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
      </CardFooter>
    </Card>
  )
}

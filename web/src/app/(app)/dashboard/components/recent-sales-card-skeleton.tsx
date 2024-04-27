import { Skeleton } from '@/components/ui/skeleton'

export function RecentSalesCardSkeleton() {
  return (
    <div className="space-y-8">
      {[1, 2, 3, 4, 5].map((_, i) => (
        <div key={i} className="flex items-center">
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="ml-4 space-y-1 flex-1">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-28" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  )
}

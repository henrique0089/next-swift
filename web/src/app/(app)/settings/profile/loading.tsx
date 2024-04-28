import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export default function ProfileLoading() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-lg font-medium">Profile</h1>
        <span className="text-sm text-muted-foreground">
          Make changes to your account here. Click update when you&apos;re done.
        </span>
      </div>

      <Separator />

      <div className="space-y-8">
        <Skeleton className="h-28 w-full" />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-9 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-9 w-full" />
          </div>
        </div>

        <Skeleton className="h-9 w-[7.6rem]" />
      </div>
    </section>
  )
}

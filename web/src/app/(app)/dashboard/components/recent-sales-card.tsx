import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatPrice } from '@/utils/format-price'
import { getInitials } from '@/utils/get-initals'
import { RecentSale } from '../page'

interface RecentSalesCardProps {
  sales: RecentSale[]
}

export function RecentSalesCard({ sales }: RecentSalesCardProps) {
  return (
    <div className="space-y-8">
      {sales.map((sale) => (
        <div key={sale.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>{getInitials(sale.customer)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.customer}</p>
            <p className="text-sm text-muted-foreground">
              {sale.customerEmail}
            </p>
          </div>
          <div className="ml-auto font-medium">+{formatPrice(sale.total)}</div>
        </div>
      ))}
    </div>
  )
}

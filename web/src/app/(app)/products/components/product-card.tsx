import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/utils/format-price'
import { Pen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ProductData } from '../page'
import { DeleteProductButton } from './delete-product-button'

interface ProductCardProps {
  data: ProductData
}

export function ProductCard({ data }: ProductCardProps) {
  return (
    <Card className="w-full max-w-[298px] overflow-hidden">
      <Image
        src={data.coverImage}
        alt=""
        width={298}
        height={456}
        className="w-full h-[9.5rem] object-cover"
      />

      <CardHeader>
        <CardTitle className="dark:text-zinc-100">{data.name}</CardTitle>
        <CardDescription className="ellipsis-text">
          {data.desciption}
        </CardDescription>
      </CardHeader>

      <div className="px-4">
        <Separator />
      </div>

      <CardFooter className="flex items-center justify-between p-4">
        <strong className="text-muted-foreground font-normal">
          <span className="font-medium text-lg text-zinc-900">
            {formatPrice(data.price)}
          </span>{' '}
          / {data.quantity}pcs
        </strong>

        <div className="flex items-center gap-2">
          <Link href={`/products/${data.id}/edit`}>
            <Pen className="h-5 w-5" />
          </Link>

          <DeleteProductButton productId={data.id} />
        </div>
      </CardFooter>
    </Card>
  )
}

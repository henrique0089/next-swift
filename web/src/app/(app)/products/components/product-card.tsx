import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Pen, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function ProductCard() {
  return (
    <Card className="w-full max-w-[298px] overflow-hidden">
      <Image
        src={`/shirt.png`}
        alt=""
        width={298}
        height={456}
        className="w-full h-[9.5rem] object-cover"
      />

      <CardHeader>
        <CardTitle className="dark:text-zinc-100">Camiseta preta</CardTitle>
        <CardDescription className="ellipsis-text">
          Lorem ipsum dolor sit amet consectetur. Tortor mauris imperdiet
          ultrices aliquet. Netus varius sit lorem consectetur consequat.
        </CardDescription>
      </CardHeader>

      <div className="px-4">
        <Separator />
      </div>

      <CardFooter className="flex items-center justify-between p-4">
        <strong className="text-muted-foreground font-normal">
          <span className="font-medium text-lg text-zinc-900">US$ 26,90</span> /
          3pcs
        </strong>

        <div className="flex items-center gap-2">
          <Link href={`/posts/25/edit`}>
            <Pen className="h-5 w-5" />
          </Link>

          <button>
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </CardFooter>
    </Card>
  )
}

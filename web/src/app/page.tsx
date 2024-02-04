import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <Image
        src="/dark-logo.svg"
        alt=""
        width={90}
        height={72}
        className="block dark:hidden select-none"
      />

      <Image
        src="/logo.svg"
        alt=""
        width={90}
        height={72}
        className="hidden dark:block select-none"
      />

      <Button variant="secondary" asChild className="rounded-full">
        <Link href="/sign-in">
          Sign In <ArrowRight />{' '}
        </Link>
      </Button>
    </main>
  )
}

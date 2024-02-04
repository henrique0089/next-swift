import { Button } from '@/components/ui/button'
import { auth } from '@clerk/nextjs'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  const { sessionId } = auth()

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

      {sessionId ? (
        <Button variant="outline" asChild className="rounded-full">
          <a href="/dashboard">
            Go to dashboard <ArrowRight />{' '}
          </a>
        </Button>
      ) : (
        <Button variant="secondary" asChild className="rounded-full">
          <a href="/sign-in">
            Sign In <ArrowRight />{' '}
          </a>
        </Button>
      )}
    </main>
  )
}

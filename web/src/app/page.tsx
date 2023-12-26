import { EmployeeAuthForm } from '@/components/employee-form'
import { Metadata } from 'next'
import Image from 'next/image'

// import { UserAuthForm } from "@/app/examples/authentication/components/user-auth-form"

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
}

export default function AuthenticationPage() {
  return (
    <main className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="bg-zinc-900  items-center justify-center hidden lg:flex">
        <Image src="/logo.svg" alt="" width={92} height={86} />
      </div>

      <Image
        src="/dark-logo.svg"
        alt=""
        width={30}
        height={24}
        className="absolute right-6 top-6"
      />
      <div className="max-w-[28rem] mx-auto w-full flex flex-col items-center justify-center gap-6 px-4">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Nice to see you again
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to continue to the dashboard
          </p>
        </div>

        <EmployeeAuthForm />
      </div>
    </main>
  )
}

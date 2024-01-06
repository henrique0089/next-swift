import Image from 'next/image'
import { UpdatePasswordForm } from './components/update-password-form'

export default function UpdatePassword() {
  return (
    <main className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="max-w-[28rem] mx-auto w-full flex flex-col items-center justify-center gap-6 px-4">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Type your new password
          </h1>
          <p className="text-sm text-muted-foreground">
            you will be logged in and redirected immediately
          </p>
        </div>

        <UpdatePasswordForm />
      </div>

      <div className="bg-zinc-900  items-center justify-center hidden lg:flex">
        <Image src="/logo.svg" alt="" width={92} height={86} />
      </div>

      <Image
        src="/dark-logo.svg"
        alt=""
        width={30}
        height={24}
        className="absolute left-6 top-6"
      />
    </main>
  )
}

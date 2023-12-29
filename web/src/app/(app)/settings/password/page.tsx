import { Separator } from '@/components/ui/separator'
import { UpdatePasswordForm } from '../components/update-password-form'

export default function Password() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-lg font-medium">Password</h1>
        <span className="text-sm text-muted-foreground">
          Change your password here. After saving, you&apos;ll be logged out.
        </span>
      </div>

      <Separator />

      <UpdatePasswordForm />
    </section>
  )
}

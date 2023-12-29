import { Separator } from '@/components/ui/separator'
import { UpdateProfileForm } from '../components/update-profile-form'

export default function Profile() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-lg font-medium">Profile</h1>
        <span className="text-sm text-muted-foreground">
          Make changes to your account here. Click update when you&apos;re done.
        </span>
      </div>

      <Separator />

      <UpdateProfileForm />
    </section>
  )
}

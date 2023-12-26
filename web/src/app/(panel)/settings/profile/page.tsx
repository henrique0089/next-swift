import { Separator } from '@/components/ui/separator'
import { UpdateProfileForm } from '../components/update-profile-form'

export default function Profile() {
  return (
    <section>
      <div>
        <h1 className="text-lg font-medium">Profile</h1>
        <span className="text-sm text-muted-foreground">
          Update your basic profile info.
        </span>
      </div>

      <Separator />

      <UpdateProfileForm />
    </section>
  )
}

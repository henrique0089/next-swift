import { Separator } from '@/components/ui/separator'
import { currentUser } from '@clerk/nextjs'
import { UpdateProfileForm } from '../components/update-profile-form'

export default async function Profile() {
  const user = await currentUser()

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-lg font-medium">Profile</h1>
        <span className="text-sm text-muted-foreground">
          Make changes to your account here. Click update when you&apos;re done.
        </span>
      </div>

      <Separator />

      <UpdateProfileForm
        user={{
          firstName: user?.firstName,
          lastName: user?.lastName,
          avatar: user?.imageUrl,
        }}
      />
    </section>
  )
}

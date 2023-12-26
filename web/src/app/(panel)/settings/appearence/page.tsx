import { Separator } from '@/components/ui/separator'
import { UpdateAppearanceForm } from '../components/update-appearence-form'

export default function Appearence() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-lg font-medium">Appearance</h1>
        <span className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </span>
      </div>

      <Separator />

      <UpdateAppearanceForm />
    </section>
  )
}

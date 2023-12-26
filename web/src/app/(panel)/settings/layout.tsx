import { Separator } from '@/components/ui/separator'
import { ReactNode } from 'react'
import { Sidebar } from './components/sidebar'

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-8 mx-auto max-w-6xl p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold">Settings</h1>
        <span className="block text-muted-foreground">
          Manage your account settings.
        </span>
      </div>

      <Separator />

      <div className="grid grid-cols-[15rem_1fr] items-start gap-8">
        <Sidebar />
        {children}
      </div>
    </div>
  )
}

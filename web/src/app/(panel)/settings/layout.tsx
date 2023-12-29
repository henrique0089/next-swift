import { NavLink } from '@/components/nav-link'
import { Separator } from '@/components/ui/separator'
import { ReactNode } from 'react'
import { Sidebar } from './components/sidebar'

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-8 mx-auto max-w-6xl p-4 lg:p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold">Settings</h1>
        <span className="block text-muted-foreground">
          Manage your account settings.
        </span>
      </div>

      <nav className="items-center mt-3 space-x-6 flex lg:hidden">
        <NavLink
          href="/settings/profile"
          className="text-zinc-400 data-[active=true]:text-zinc-900"
        >
          Profile
        </NavLink>
        <NavLink
          href="/settings/password"
          className="text-zinc-400 data-[active=true]:text-zinc-900"
        >
          Password
        </NavLink>
        <NavLink
          href="/settings/appearence"
          className="text-zinc-400 data-[active=true]:text-zinc-900"
        >
          Appearence
        </NavLink>
      </nav>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] items-start gap-8">
        <Sidebar />
        {children}
      </div>
    </div>
  )
}

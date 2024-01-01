import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { NavLink } from './nav-link'
import { Separator } from './ui/separator'
import { UserNav } from './user-nav'

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between bg-zinc-900 border-b border-zinc-100 px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Image src="/logo.svg" alt="" width={30} height={24} />
        </Link>

        <Separator orientation="vertical" className="h-6" />

        <h3 className="font-medium text-muted lg:hidden">Welcome, Jhon!</h3>

        <nav className="items-center space-x-6 hidden lg:flex">
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/products">Products</NavLink>
          <NavLink href="/sales">Sales</NavLink>
          <NavLink href="/customers">Customers</NavLink>
          <NavLink href="/employees">Employees</NavLink>
          <NavLink href="/suppliers">Suppliers</NavLink>
          <NavLink href="/categories">Categories</NavLink>
        </nav>
      </div>

      <div className="items-center gap-4 hidden lg:flex">
        <h3 className="font-medium text-muted">Welcome, Jhon!</h3>

        <UserNav />
      </div>

      <button className="lg:hidden">
        <Menu className="stroke-muted" />
      </button>
    </header>
  )
}

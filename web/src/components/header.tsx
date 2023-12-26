import Image from 'next/image';
import Link from 'next/link';
import { NavLink } from './nav-link';
import { Separator } from './ui/separator';
import { UserNav } from './user-nav';

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-100 px-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Image src="/dark-logo.svg" alt="" width={30} height={24} />
        </Link>
        
        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-6">
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/products">Products</NavLink>
          <NavLink href="/sales">Sales</NavLink>
          <NavLink href="/customers">Customers</NavLink>
          <NavLink href="/employees">Employees</NavLink>
          <NavLink href="/categories">Categories</NavLink>
          <NavLink href="/suppliers">Suppliers</NavLink>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <h3 className="font-medium text-muted-foreground">
          Welcome, Jhon!
        </h3>

        <UserNav />
      </div>
    </header>
  )
}
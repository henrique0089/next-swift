'use client'

import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type SidebarNavProps = ComponentProps<'nav'>

const sidebarLinks = [
  { href: '/settings/profile', title: 'Profile' },
  { href: '/settings/password', title: 'Password' },
  { href: '/settings/appearence', title: 'Appearence' },
]

export function Sidebar({ ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className="hidden lg:flex flex-col space-y-1" {...props}>
      {sidebarLinks.map((link) => {
        return (
          <Link
            key={link.href}
            href={link.href}
            data-current={pathname === link.href}
            className={twMerge(
              buttonVariants({ variant: 'ghost' }),
              'justify-start hover:bg-transparent hover:underline',
              'data-[current=true]:bg-muted data-[current=true]:hover:bg-muted',
            )}
          >
            {link.title}
          </Link>
        )
      })}
    </nav>
  )
}

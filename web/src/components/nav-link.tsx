'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type NavLinkProps = ComponentProps<typeof Link>

export function NavLink(props: NavLinkProps) {
  const pathname = usePathname()

  const isActive = pathname === props.href

  return (
    <Link
      data-active={isActive}
      className={twMerge(
        'text-sm font-medium text-zinc-400 transition-colors hover:text-muted data-[active=true]:text-muted',
        props.className,
      )}
      {...props}
    />
  )
}
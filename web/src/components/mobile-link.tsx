import Link, { LinkProps } from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export function MobileLink({
  href,
  onOpenChange,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  const pathname = usePathname()

  const isActive = pathname === href

  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      data-active={isActive}
      {...props}
      className="text-muted-foreground data-[active=true]:text-zinc-900 data-[active=true]:font-medium"
    >
      {children}
    </Link>
  )
}

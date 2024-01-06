'use client'

import { Menu, User2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { MobileLink } from './mobile-link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

export function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="lg:hidden">
          <Menu className="stroke-muted" />
        </button>
      </SheetTrigger>

      <SheetContent side="left">
        <MobileLink href="/dashboard" onOpenChange={setOpen}>
          <Image src="/dark-logo.svg" alt="" width={30} height={24} />
        </MobileLink>

        <div className="mt-6 flex flex-col gap-3">
          <MobileLink href="/dashboard" onOpenChange={setOpen}>
            Dashboard
          </MobileLink>

          <MobileLink href="/products" onOpenChange={setOpen}>
            Products
          </MobileLink>

          <MobileLink href="/sales" onOpenChange={setOpen}>
            Sales
          </MobileLink>

          <MobileLink href="/customers" onOpenChange={setOpen}>
            Customers
          </MobileLink>

          <MobileLink href="/employees" onOpenChange={setOpen}>
            Employees
          </MobileLink>

          <MobileLink href="/suppliers" onOpenChange={setOpen}>
            Suppliers
          </MobileLink>

          <MobileLink href="/categories" onOpenChange={setOpen}>
            Categories
          </MobileLink>
        </div>

        <div className="mt-12 flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={'/avatars/man.png'}
                alt={'jhondoe'}
                className="object-cover"
              />
              <AvatarFallback>
                <User2 />
              </AvatarFallback>
            </Avatar>

            <div className="text-sm font-medium leading-none space-y-2">
              <p>Jhon doe</p>
              <Badge className="rounded-full">Admin</Badge>
            </div>
          </div>

          <MobileLink href="/settings/profile" onOpenChange={setOpen}>
            Profile
          </MobileLink>

          <MobileLink href="/settings/password" onOpenChange={setOpen}>
            Password
          </MobileLink>

          <MobileLink href="/settings/appearence" onOpenChange={setOpen}>
            Appearence
          </MobileLink>

          <button className="text-muted-foreground w-fit">Log out</button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

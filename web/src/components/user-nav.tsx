import { SignOutButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-9 w-9">
          <AvatarFallback>
            <Image
              src="/avatars/man.png"
              alt="jhon doe"
              width={60}
              height={60}
            />
          </AvatarFallback>

          <AvatarImage />
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <div className="text-sm font-medium leading-none flex items-center justify-between">
              <p>Jhon doe</p>
              <Badge className="rounded-full">Admin</Badge>
            </div>
            <p className="text-xs leading-none text-muted-foreground">
              jhondoe@gmail.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings/password">Password</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings/appearence">Appearence</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <SignOutButton>
            <div>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </div>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

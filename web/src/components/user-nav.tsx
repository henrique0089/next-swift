'use client'

import { useAuth, useUser } from '@clerk/nextjs'
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

function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase().concat(value.slice(1))
}

export function UserNav() {
  const { user } = useUser()
  const { signOut } = useAuth()

  async function handleSignOut() {
    await signOut()

    window.location.href = '/sign-in'
  }

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

          <AvatarImage src={user?.imageUrl} alt={user?.firstName ?? ''} />
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <div className="text-sm font-medium leading-none flex items-center justify-between">
              <p>{user?.firstName}</p>
              <Badge className="rounded-full">
                {capitalizeFirstLetter(String(user?.publicMetadata.role))}
              </Badge>
            </div>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.emailAddresses[0].emailAddress}
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
        <DropdownMenuItem onClick={handleSignOut}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

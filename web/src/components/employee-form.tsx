"use client"


import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { SyntheticEvent, useState } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export function EmployeeAuthForm() {
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2 w-full">
      <div>
        <Label htmlFor="email">
          Email
        </Label>
        <Input
          id="email"
          placeholder="name@example.com"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          disabled={isLoading}
        />
      </div>

      <div>
        <Label htmlFor="password">
          Password
        </Label>
        <Input
          id="password"
          placeholder="your password"
          type="password"
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect="off"
          disabled={isLoading}
        />
        <Link href="/forgot-password" className="text-right mt-2 w-full block text-sm text-muted-foreground hover:underline underline-offset-4 hover:text-primary">Forgot password?</Link>
      </div>

      <Button disabled={isLoading} className="w-full">
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        Sign In
      </Button>
    </form>
  )
}
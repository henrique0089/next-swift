import { AccountData, AuthProvider } from '@app/providers/auth-provider'
import { clerkClient } from '@infra/app'

export class ClerkAuthProvider implements AuthProvider {
  async createAccount({
    firstName,
    lastName,
    email,
    pass,
  }: AccountData): Promise<void> {
    await clerkClient.users.createUser({
      firstName,
      lastName,
      emailAddress: [email],
      password: pass,
    })
  }
}

import { AccountData, AuthProvider } from '@app/providers/auth-provider'
import clerkClient from '@clerk/clerk-sdk-node'

export class ClerkAuthProvider implements AuthProvider {
  async createAccount({
    firstName,
    lastName,
    email,
    pass,
    role,
  }: AccountData): Promise<{ externalId: string }> {
    const { id } = await clerkClient.users.createUser({
      firstName,
      lastName,
      emailAddress: [email],
      password: pass,
      publicMetadata: {
        role,
      },
    })

    return {
      externalId: id,
    }
  }

  async updateDetails(id: string, data: Partial<AccountData>): Promise<void> {
    await clerkClient.users.updateUser(id, {
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.pass,
    })
  }

  async deleteAccount(id: string): Promise<void> {
    await clerkClient.users.deleteUser(id)
  }
}

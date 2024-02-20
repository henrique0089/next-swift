import { AccountData, AuthProvider } from '@app/providers/auth-provider'
import { randomUUID } from 'crypto'

export class InMemoryAuthProvider implements AuthProvider {
  public accounts: AccountData[] = []

  async createAccount(data: AccountData): Promise<{ externalId: string }> {
    this.accounts.push(data)

    return {
      externalId: randomUUID(),
    }
  }

  async updateDetails(id: string, data: Partial<AccountData>): Promise<void> {
    const index = this.accounts.findIndex(
      (account) => account.email === data.email,
    )

    if (index > -1) {
      this.accounts[index] = {
        firstName: data.firstName ?? this.accounts[index].firstName,
        lastName: data.lastName ?? this.accounts[index].lastName,
        pass: data.pass ?? this.accounts[index].pass,
        email: this.accounts[index].email,
      }
    }
  }

  async deleteAccount(id: string): Promise<void> {
    this.accounts = []
  }
}

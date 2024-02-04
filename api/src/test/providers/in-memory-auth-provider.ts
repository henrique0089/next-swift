import { AccountData, AuthProvider } from '@app/providers/auth-provider'

export class InMemoryAuthProvider implements AuthProvider {
  public accounts: AccountData[] = []

  async createAccount(data: AccountData): Promise<void> {
    this.accounts.push(data)
  }
}

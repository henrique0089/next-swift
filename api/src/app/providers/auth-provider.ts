export type AccountData = {
  firstName: string
  lastName: string
  email: string
  pass: string
}

export interface AuthProvider {
  createAccount(data: AccountData): Promise<{ externalId: string }>
  updateDetails(id: string, data: Partial<AccountData>): Promise<void>
  deleteAccount(id: string): Promise<void>
}

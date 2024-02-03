export type AccountData = {
  firstName: string
  lastName: string
  email: string
  pass: string
}

export interface AuthProvider {
  createAccount(data: AccountData): Promise<void>
}

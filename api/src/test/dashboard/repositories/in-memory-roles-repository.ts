import { RolesRepository } from '@app/repositories/roles-repository'

export class InMemoryRolesRepository implements RolesRepository {
  public roles: string[] = []

  async findAll(): Promise<string[]> {
    return this.roles
  }

  async findByName(name: string): Promise<string | null> {
    const role = this.roles.find((role) => role === name)

    if (!role) {
      return null
    }

    return role
  }

  async create(role: string): Promise<void> {
    this.roles.push(role)
  }
}

import { Role } from '@app/dashboard/entities/role'
import { RolesRepository } from '@app/dashboard/repositories/roles-repository'

export class InMemoryRolesRepository implements RolesRepository {
  public roles: Role[] = []

  async findAll(): Promise<Role[]> {
    return this.roles
  }

  async findByName(name: string): Promise<Role | null> {
    const role = this.roles.find((role) => role.name === name)

    if (!role) {
      return null
    }

    return role
  }

  async create(role: Role): Promise<void> {
    this.roles.push(role)
  }
}

import { Role } from '@app/dashboard/entities/role'

export interface RolesRepository {
  findByName(name: string): Promise<Role | null>
  create(role: Role): Promise<void>
}

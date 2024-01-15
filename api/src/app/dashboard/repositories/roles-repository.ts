import { Role } from '@app/dashboard/entities/role'

export interface RolesRepository {
  findAll(): Promise<Role[]>
  findByName(name: string): Promise<Role | null>
  create(role: Role): Promise<void>
}

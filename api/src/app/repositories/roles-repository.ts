import { Role } from '@app/entities/role'

export interface RolesRepository {
  findAll(): Promise<Role[]>
  findByName(name: string): Promise<Role | null>
  create(role: Role): Promise<void>
}

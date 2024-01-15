import { Role } from '@app/dashboard/entities/role'
import { RolesRepository } from '@app/dashboard/repositories/roles-repository'

export class GetAllRolesUseCase {
  constructor(private rolesRepo: RolesRepository) {}

  async execute(): Promise<Role[]> {
    return await this.rolesRepo.findAll()
  }
}

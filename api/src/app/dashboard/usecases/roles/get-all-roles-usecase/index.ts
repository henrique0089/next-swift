import { Role } from '@app/dashboard/entities/role'
import { RolesRepository } from '@app/dashboard/repositories/roles-repository'

interface Response {
  roles: Role[]
}

export class GetAllRolesUseCase {
  constructor(private rolesRepo: RolesRepository) {}

  async execute(): Promise<Response> {
    const roles = await this.rolesRepo.findAll()

    return {
      roles,
    }
  }
}

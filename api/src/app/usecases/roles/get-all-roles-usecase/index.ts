import { RolesRepository } from '@app/dashboard/repositories/roles-repository'
import { Role } from '@app/entities/role'

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

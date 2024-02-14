import { RolesRepository } from '@app/repositories/roles-repository'

interface Response {
  roles: string[]
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

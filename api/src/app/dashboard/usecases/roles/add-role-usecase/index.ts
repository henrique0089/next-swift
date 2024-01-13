import { Role } from '@app/dashboard/entities/role'
import { AppError } from '@app/dashboard/errors/app-error'
import { RolesRepository } from '@app/dashboard/repositories/roles-repository'

type Response = void

export class CreateRoleUseCase {
  constructor(private rolesRepo: RolesRepository) {}

  async execute(name: string): Promise<Response> {
    if (!name) {
      throw new AppError('name is required!')
    }

    const roleAlreadyExists = await this.rolesRepo.findByName(name)

    if (roleAlreadyExists) {
      throw new AppError('role already exists!')
    }

    const role = new Role({
      name,
    })

    await this.rolesRepo.create(role)
  }
}

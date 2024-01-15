import { Role } from '@app/dashboard/entities/role'
import { AppError } from '@app/dashboard/errors/app-error'
import { RolesRepository } from '@app/dashboard/repositories/roles-repository'

interface Request {
  name: string
}

type Response = void

export class AddRoleUseCase {
  constructor(private rolesRepo: RolesRepository) {}

  async execute({ name }: Request): Promise<Response> {
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

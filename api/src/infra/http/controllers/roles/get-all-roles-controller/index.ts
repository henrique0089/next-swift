import { GetAllRolesUseCase } from '@app/usecases/roles/get-all-roles-usecase'
import { PGRolesRepository } from '@infra/database/pg/repositories/pg-roles-repository'
import { Request, Response } from 'express'

export class GetAllRolesController {
  async handle(req: Request, rep: Response): Promise<Response> {
    const rolesRepository = new PGRolesRepository()
    const getAllRolesUseCase = new GetAllRolesUseCase(rolesRepository)

    const result = await getAllRolesUseCase.execute()

    const roles = result.roles.map((role) => {
      return {
        id: role.id,
        name: role.name,
      }
    })

    return rep.json({ roles })
  }
}

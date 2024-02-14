import { GetAllRolesUseCase } from '@app/usecases/roles/get-all-roles-usecase'
import { PGRolesRepository } from '@infra/database/pg/repositories/pg-roles-repository'
import { Request, Response } from 'express'

export class GetAllRolesController {
  async handle(req: Request, rep: Response): Promise<Response> {
    const rolesRepository = new PGRolesRepository()
    const getAllRolesUseCase = new GetAllRolesUseCase(rolesRepository)

    const { roles } = await getAllRolesUseCase.execute()

    return rep.json({ roles })
  }
}

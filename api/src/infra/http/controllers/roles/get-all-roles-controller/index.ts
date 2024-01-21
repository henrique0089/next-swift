import { GetAllRolesUseCase } from '@app/usecases/roles/get-all-roles-usecase'
import { PGRolesRepository } from '@infra/database/pg/repositories/pg-roles-repository'
import { FastifyReply, FastifyRequest } from 'fastify'

export class GetAllRolesController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<FastifyReply> {
    const rolesRepository = new PGRolesRepository()
    const getAllRolesUseCase = new GetAllRolesUseCase(rolesRepository)

    const { roles } = await getAllRolesUseCase.execute()

    return rep.send(roles)
  }
}

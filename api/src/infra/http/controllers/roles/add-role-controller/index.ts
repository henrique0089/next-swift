import { AddRoleUseCase } from '@app/usecases/roles/add-role-usecase'
import { PGRolesRepository } from '@infra/database/pg/repositories/pg-roles-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const bodySchema = z.object({
  name: z.string(),
})

export class AddRoleController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<FastifyReply> {
    const { name } = bodySchema.parse(req.body)

    const rolesRepository = new PGRolesRepository()
    const addRoleUseCase = new AddRoleUseCase(rolesRepository)

    await addRoleUseCase.execute({ name })

    return rep.status(201).send('role added successfuly!')
  }
}

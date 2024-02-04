import { AddRoleUseCase } from '@app/usecases/roles/add-role-usecase'
import { PGRolesRepository } from '@infra/database/pg/repositories/pg-roles-repository'
import { Request, Response } from 'express'
import { z } from 'zod'

const bodySchema = z.object({
  name: z.string(),
})

export class AddRoleController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = bodySchema.parse(req.body)

    const rolesRepository = new PGRolesRepository()
    const addRoleUseCase = new AddRoleUseCase(rolesRepository)

    await addRoleUseCase.execute({ name })

    return res.status(201).json({ message: 'role added successfuly!' })
  }
}

import { z } from 'zod'

import { HireEmployeeUseCase } from '@app/dashboard/usecases/employees/hire-employee-usecase'
import { PGEmployeesRepository } from '@infra/database/pg/dashboard/repositories/pg-employees-repository'
import { FastifyReply, FastifyRequest } from 'fastify'

const bodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  ddd: z.coerce.number(),
  phone: z.coerce.number(),
  roleId: z.string(),
})

export class HireEmployeeController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<FastifyReply> {
    const { firstName, lastName, email, ddd, phone, roleId } = bodySchema.parse(
      req.body,
    )
    const avatar = 'avatar.png'

    const employeesRepository = new PGEmployeesRepository()

    const hireEmployeeUseCase = new HireEmployeeUseCase(employeesRepository)

    const { password } = await hireEmployeeUseCase.execute({
      firstName,
      lastName,
      email,
      ddd,
      phone: Number(phone),
      avatar: avatar ?? null,
      roleId,
    })

    return rep.status(201).send({ password })
  }
}

import { z } from 'zod'

import { HireEmployeeUseCase } from '@app/dashboard/usecases/employees/hire-employee-usecase'
import { PGEmployeesRepository } from '@infra/database/pg/dashboard/repositories/pg-employees-repository'
import { FastifyReply, FastifyRequest } from 'fastify'

const bodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.coerce.number(),
  // role: z.string(),
})

export class HireEmployeeController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<FastifyReply> {
    const { name, email, phone } = bodySchema.parse(req.body)
    const avatar = 'avatar.png'

    const employeesRepository = new PGEmployeesRepository()

    const hireEmployeeUseCase = new HireEmployeeUseCase(employeesRepository)

    await hireEmployeeUseCase.execute({
      name,
      email,
      phone: Number(phone),
      avatar: avatar ?? null,
      roleId: 'admin',
    })

    return rep.status(201).send({ message: 'Employee hired!' })
  }
}

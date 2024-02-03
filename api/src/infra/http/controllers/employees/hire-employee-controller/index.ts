import { z } from 'zod'

import { HireEmployeeUseCase } from '@app/usecases/employees/hire-employee-usecase'
import { PGEmployeesRepository } from '@infra/database/pg/repositories/pg-employees-repository'
import { ClerkAuthProvider } from '@infra/providers/auth/clerk-auth-provider'
import { FastifyReply, FastifyRequest } from 'fastify'

const bodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  ddd: z.coerce.number(),
  phone: z.coerce.number(),
  gender: z.enum(['M', 'F']),
  roleId: z.string(),
})

export class HireEmployeeController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<FastifyReply> {
    const { firstName, lastName, email, ddd, phone, gender, roleId } =
      bodySchema.parse(req.body)
    const avatar = 'avatar.png'

    const employeesRepository = new PGEmployeesRepository()
    const authProvider = new ClerkAuthProvider()

    const hireEmployeeUseCase = new HireEmployeeUseCase(
      employeesRepository,
      authProvider,
    )

    const { password } = await hireEmployeeUseCase.execute({
      firstName,
      lastName,
      email,
      ddd,
      phone: Number(phone),
      avatar: avatar ?? null,
      gender,
      roleId,
    })

    return rep.status(201).send({ password })
  }
}

import { z } from 'zod'

import { HireEmployeeUseCase } from '@app/usecases/employees/hire-employee-usecase'
import { PGEmployeesRepository } from '@infra/database/pg/repositories/pg-employees-repository'
import { ClerkAuthProvider } from '@infra/providers/auth/clerk-auth-provider'
import { Request, Response } from 'express'

const bodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  ddd: z.coerce.number(),
  phone: z.coerce.number(),
  role: z.enum(['admin', 'editor']),
})

export class HireEmployeeController {
  async handle(req: Request, res: Response): Promise<Response> {
    const userId = req.auth.userId
    const { firstName, lastName, email, ddd, phone, role } = bodySchema.parse(
      req.body,
    )

    const employeesRepository = new PGEmployeesRepository()
    const authProvider = new ClerkAuthProvider()

    const hireEmployeeUseCase = new HireEmployeeUseCase(
      employeesRepository,
      authProvider,
    )

    const { password } = await hireEmployeeUseCase.execute({
      adminExternalId: userId,
      firstName,
      lastName,
      email,
      ddd,
      phone: Number(phone),
      avatar: null,
      role,
    })

    return res.status(201).send({ password })
  }
}

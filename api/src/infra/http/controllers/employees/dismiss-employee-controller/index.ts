import { DismissEmployeeUseCase } from '@app/usecases/employees/dismiss-employee-usecase'
import { PGEmployeesRepository } from '@infra/database/pg/repositories/pg-employees-repository'
import { ClerkAuthProvider } from '@infra/providers/auth/clerk-auth-provider'
import { Request, Response } from 'express'
import { z } from 'zod'

const bodySchema = z.object({
  employeeId: z.string(),
})

export class DismissEmployeeController {
  async handle(req: Request, res: Response): Promise<Response> {
    const adminId = req.auth.userId
    const { employeeId } = bodySchema.parse(req.body)

    const employeesRepo = new PGEmployeesRepository()
    const authProvider = new ClerkAuthProvider()
    const dismissEmployeeUseCase = new DismissEmployeeUseCase(
      employeesRepo,
      authProvider,
    )

    await dismissEmployeeUseCase.execute({ adminId, employeeId })

    return res.status(204).send()
  }
}

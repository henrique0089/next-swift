import { GetProfileInfoUseCase } from '@app/usecases/employees/get-profile-info-usecase'
import clerkClient from '@clerk/clerk-sdk-node'
import { PGEmployeesRepository } from '@infra/database/pg/repositories/pg-employees-repository'
import { Request, Response } from 'express'

export class GetProfileInfoController {
  async handle(req: Request, res: Response): Promise<Response> {
    const userId = req.auth.userId
    const user = await clerkClient.users.getUser(userId)

    const employeesRepo = new PGEmployeesRepository()
    const getProfileInfoUseCase = new GetProfileInfoUseCase(employeesRepo)

    const result = await getProfileInfoUseCase.execute({
      email: user.emailAddresses[0].emailAddress,
    })

    const employee = {
      name: result.employee.firstName,
      email: result.employee.email,
      role: result.employee.role,
      avatar: result.employee.avatar,
    }

    return res.json({ employee })
  }
}

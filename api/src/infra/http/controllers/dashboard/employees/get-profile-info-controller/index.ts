import { GetProfileInfoUseCase } from '@app/dashboard/usecases/employees/get-profile-info-usecase'
import { PGEmployeesRepository } from '@infra/database/pg/dashboard/repositories/pg-employees-repository'
import { FastifyReply, FastifyRequest } from 'fastify'

export class GetProfileInfoController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<FastifyReply> {
    const employeeId = 'employeeId'

    const employeesRepo = new PGEmployeesRepository()
    const getProfileInfoUseCase = new GetProfileInfoUseCase(employeesRepo)

    const { employee } = await getProfileInfoUseCase.execute({ employeeId })

    const data = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      avatar: employee.avatar,
    }

    return rep.send({ employee: data })
  }
}

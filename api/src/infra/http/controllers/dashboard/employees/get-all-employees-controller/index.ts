import { GetAllEmployeesUseCase } from '@app/dashboard/usecases/employees/get-all-employees-usecase'
import { PGEmployeesRepository } from '@infra/database/pg/dashboard/repositories/pg-employees-repository'
import { EmployeeViewModel } from '@infra/http/view-models/employee-view-model'
import { FastifyReply, FastifyRequest } from 'fastify'

export class GetAllEmployeesController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<FastifyReply> {
    const employeesRepository = new PGEmployeesRepository()

    const getAllEmployeesUseCase = new GetAllEmployeesUseCase(
      employeesRepository,
    )

    const employeesData = await getAllEmployeesUseCase.execute()
    const employees = employeesData.map(EmployeeViewModel.toHttp)

    return rep.send({ employees })
  }
}

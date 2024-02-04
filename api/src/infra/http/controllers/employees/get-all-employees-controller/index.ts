import { GetAllEmployeesUseCase } from '@app/usecases/employees/get-all-employees-usecase'
import { PGEmployeesRepository } from '@infra/database/pg/repositories/pg-employees-repository'
import { EmployeeViewModel } from '@infra/http/view-models/employee-view-model'
import { Request, Response } from 'express'

export class GetAllEmployeesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const employeesRepository = new PGEmployeesRepository()

    const getAllEmployeesUseCase = new GetAllEmployeesUseCase(
      employeesRepository,
    )

    const employeesData = await getAllEmployeesUseCase.execute()
    const employees = employeesData.map(EmployeeViewModel.toHttp)

    return res.json({ employees })
  }
}

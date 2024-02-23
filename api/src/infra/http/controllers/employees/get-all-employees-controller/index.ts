import { GetAllEmployeesUseCase } from '@app/usecases/employees/get-all-employees-usecase'
import { PGEmployeesRepository } from '@infra/database/pg/repositories/pg-employees-repository'
import { EmployeeViewModel } from '@infra/http/view-models/employee-view-model'
import { Request, Response } from 'express'
import { z } from 'zod'

const querySchema = z.object({
  employee: z.string().optional(),
  email: z.string().optional(),
  document: z.string().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
})

export class GetAllEmployeesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const userId = req.auth.userId

    const { employee, email, document, startDate, endDate, page, limit } =
      querySchema.parse(req.query)

    const employeesRepository = new PGEmployeesRepository()
    const getAllEmployeesUseCase = new GetAllEmployeesUseCase(
      employeesRepository,
    )

    const { employees: employeesData } = await getAllEmployeesUseCase.execute({
      employee,
      email,
      document,
      startDate,
      endDate,
      page,
      limit,
    })
    const employees = employeesData
      // .filter((employee) => employee.externalId !== userId)
      .map(EmployeeViewModel.toHttp)

    return res.json({ employees })
  }
}

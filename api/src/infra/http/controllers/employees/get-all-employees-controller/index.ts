import { GetAllEmployeesUseCase } from '@app/usecases/employees/get-all-employees-usecase'
import { PGEmployeesRepository } from '@infra/database/pg/repositories/pg-employees-repository'
import { EmployeeViewModel } from '@infra/http/view-models/employee-view-model'
import { Request, Response } from 'express'
import { z } from 'zod'

const querySchema = z.object({
  employee: z.string().optional(),
  email: z.string().optional(),
  document: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
})

export class GetAllEmployeesController {
  async handle(req: Request, res: Response): Promise<Response> {
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
    const employees = employeesData.map(EmployeeViewModel.toHttp)

    return res.json({ employees })
  }
}

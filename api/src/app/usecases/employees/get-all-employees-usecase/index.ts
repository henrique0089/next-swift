import { Employee } from '@app/entities/employee'
import { EmployeesRepository } from '@app/repositories/employees-repository'

interface Request {
  employee?: string
  email?: string
  document?: string
  startDate?: Date
  endDate?: Date
  page?: number
  limit?: number
}

interface Response {
  employees: Employee[]
}

export class GetAllEmployeesUseCase {
  constructor(private employeesRepo: EmployeesRepository) {}

  async execute(data: Request): Promise<Response> {
    const employees = await this.employeesRepo.paginate(data)

    return {
      employees,
    }
  }
}

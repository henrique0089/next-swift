import { Employee } from '@app/dashboard/entities/employee'
import { AppError } from '@app/dashboard/errors/app-error'
import { EmployeesRepository } from '@app/dashboard/repositories/employees-repository'

interface Request {
  employeeId: string
}

interface Response {
  employee: Employee
}

export class GetProfileInfoUseCase {
  constructor(private employeesRepo: EmployeesRepository) {}

  async execute({ employeeId }: Request): Promise<Response> {
    const employee = await this.employeesRepo.findById(employeeId)

    if (!employee) throw new AppError('employee not found!', 404)

    return {
      employee,
    }
  }
}

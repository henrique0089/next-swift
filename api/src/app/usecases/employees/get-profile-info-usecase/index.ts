import { Employee } from '@app/entities/employee'
import { AppError } from '@app/errors/app-error'
import { EmployeesRepository } from '@app/repositories/employees-repository'

interface Request {
  email: string
}

interface Response {
  employee: Employee
}

export class GetProfileInfoUseCase {
  constructor(private employeesRepo: EmployeesRepository) {}

  async execute({ email }: Request): Promise<Response> {
    const employee = await this.employeesRepo.findByEmail(email)

    if (!employee) {
      throw new AppError('Employee not found!')
    }

    return {
      employee,
    }
  }
}

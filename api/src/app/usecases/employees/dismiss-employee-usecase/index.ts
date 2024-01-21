import { AppError } from '@app/errors/app-error'
import { EmployeesRepository } from '@app/repositories/employees-repository'

interface Request {
  adminId: string
  employeeId: string
}

type Response = void

export class DismissEmployeeUseCase {
  constructor(private employeesRepo: EmployeesRepository) {}

  async execute({ adminId, employeeId }: Request): Promise<Response> {
    const admin = await this.employeesRepo.findById(adminId)

    if (!admin || admin.role?.name !== 'admin') {
      throw new AppError('Unauthorized action!')
    }

    const employee = await this.employeesRepo.findById(employeeId)

    if (!employee) {
      throw new AppError('Employee not found!')
    }

    employee.dismiss()

    await this.employeesRepo.save(employee)
  }
}

import { AppError } from '@app/errors/app-error'
import { AuthProvider } from '@app/providers/auth-provider'
import { EmployeesRepository } from '@app/repositories/employees-repository'

interface Request {
  externalAdminId: string
  employeeId: string
}

type Response = void

export class DismissEmployeeUseCase {
  constructor(
    private employeesRepo: EmployeesRepository,
    private authProvider: AuthProvider,
  ) {}

  async execute({ externalAdminId, employeeId }: Request): Promise<Response> {
    const admin = await this.employeesRepo.findByExternalId(externalAdminId)

    if (!admin || admin.role !== 'admin') {
      throw new AppError('Unauthorized action!')
    }

    const employee = await this.employeesRepo.findById(employeeId)

    if (!employee) {
      throw new AppError('Employee not found!')
    }

    employee.dismiss()

    await this.employeesRepo.save(employee)

    await this.authProvider.deleteAccount(employee.externalId)
  }
}

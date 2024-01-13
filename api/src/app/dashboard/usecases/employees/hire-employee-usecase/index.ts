import { Employee } from '@app/dashboard/entities/employee'
import { AppError } from '@app/dashboard/errors/app-error'
import { EmployeesRepository } from '@app/dashboard/repositories/employees-repository'

interface Request {
  name: string
  email: string
  phone: number
  avatar: string | null
  roleId: string
}

type Response = void

export class HireEmployeeUseCase {
  constructor(private employeesRepo: EmployeesRepository) {}

  async execute(data: Request): Promise<Response> {
    const { name, email, phone, avatar, roleId } = data

    const employeeAlreadyExists = await this.employeesRepo.findByEmail(email)

    if (employeeAlreadyExists) {
      throw new AppError('Employee already exists!')
    }

    // const password = randomBytes(10).toString('hex')

    const employee = new Employee({
      name,
      email,
      phone,
      avatar,
      roles: null,
    })

    await this.employeesRepo.create(employee, roleId)
  }
}

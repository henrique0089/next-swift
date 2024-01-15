import { Employee } from '@app/dashboard/entities/employee'
import { AppError } from '@app/dashboard/errors/app-error'
import { EmployeesRepository } from '@app/dashboard/repositories/employees-repository'

interface Request {
  firstName: string
  lastName: string
  email: string
  ddd: number
  phone: number
  avatar: string | null
  roleId: string
}

type Response = void

export class HireEmployeeUseCase {
  constructor(private employeesRepo: EmployeesRepository) {}

  async execute(data: Request): Promise<Response> {
    const { firstName, lastName, email, ddd, phone, avatar, roleId } = data

    const employeeAlreadyExists = await this.employeesRepo.findByEmail(email)

    if (employeeAlreadyExists) {
      throw new AppError('Employee already exists!')
    }

    // const password = randomBytes(10).toString('hex')

    const employee = new Employee({
      firstName,
      lastName,
      email,
      ddd,
      phone,
      avatar,
      role: null,
    })

    await this.employeesRepo.create(employee, roleId)
  }
}

import { Employee, Gender } from '@app/entities/employee'
import { AppError } from '@app/errors/app-error'
import { EmployeesRepository } from '@app/repositories/employees-repository'
import { randomBytes } from 'crypto'

interface Request {
  firstName: string
  lastName: string
  email: string
  ddd: number
  phone: number
  avatar: string | null
  gender: Gender
  roleId: string
}

interface Response {
  password: string
}

export class HireEmployeeUseCase {
  constructor(private employeesRepo: EmployeesRepository) {}

  async execute(data: Request): Promise<Response> {
    const { firstName, lastName, email, ddd, phone, avatar, gender, roleId } =
      data

    const employeeAlreadyExists = await this.employeesRepo.findByEmail(email)

    if (employeeAlreadyExists) {
      throw new AppError('Employee already exists!')
    }

    const password = randomBytes(10).toString('hex')

    const employee = new Employee({
      firstName,
      lastName,
      email,
      ddd,
      phone,
      avatar,
      gender,
      role: null,
    })

    await this.employeesRepo.create(employee, roleId)

    return {
      password,
    }
  }
}

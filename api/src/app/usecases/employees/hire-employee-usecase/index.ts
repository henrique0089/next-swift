import { Employee, Gender, Role } from '@app/entities/employee'
import { AppError } from '@app/errors/app-error'
import { AuthProvider } from '@app/providers/auth-provider'
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
  role: Role
}

interface Response {
  password: string
}

export class HireEmployeeUseCase {
  constructor(
    private readonly employeesRepo: EmployeesRepository,
    private readonly authProvider: AuthProvider,
  ) {}

  async execute(data: Request): Promise<Response> {
    const { firstName, lastName, email, ddd, phone, avatar, gender, role } =
      data

    const employeeAlreadyExists = await this.employeesRepo.findByEmail(email)

    if (employeeAlreadyExists) {
      throw new AppError('Employee already exists!')
    }

    let password = ''

    while (password.length < 8) {
      password = randomBytes(10).toString('hex')
    }

    const { externalId } = await this.authProvider.createAccount({
      firstName,
      lastName,
      email,
      pass: password,
    })

    const employee = new Employee({
      firstName,
      lastName,
      email,
      ddd,
      phone,
      avatar,
      gender,
      role,
      externalId,
    })

    await this.employeesRepo.create(employee)

    return {
      password,
    }
  }
}

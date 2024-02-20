import { AppError } from '@app/errors/app-error'
import { AuthProvider } from '@app/providers/auth-provider'
import { EmployeesRepository } from '@app/repositories/employees-repository'

interface Request {
  externalId: string
  firstName?: string
  lastName?: string
  avatar?: {
    fileName: string
    fileType: string
    body: Buffer
  }
}

type Response = void

export class UpdateProfileInfoUseCase {
  constructor(
    private employeesRepo: EmployeesRepository,
    private authProvider: AuthProvider,
  ) {}

  async execute({
    externalId,
    firstName,
    lastName,
    avatar,
  }: Request): Promise<Response> {
    const employee = await this.employeesRepo.findByExternalId(externalId)

    if (!employee) throw new AppError('Employee not found!')

    employee.firstName = firstName ?? employee.firstName
    employee.lastName = lastName ?? employee.lastName
    employee.avatar = avatar?.fileName ?? employee.avatar
    employee.update()

    // TODO: add bucket provider for image upload

    await this.employeesRepo.save(employee)

    await this.authProvider.updateDetails(externalId, { firstName, lastName })
  }
}

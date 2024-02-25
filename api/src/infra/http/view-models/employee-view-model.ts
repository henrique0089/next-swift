import { Employee } from '@app/entities/employee'
import { env } from '@infra/env'

export class EmployeeViewModel {
  static toHttp(employee: Employee) {
    return {
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      externalId: employee.externalId,
      ddd: employee.ddd,
      phone: employee.phone,
      avatar: employee.avatar
        ? `${env.UPLOADS_FOLDER_URL}/avatar/${employee.avatar}`
        : null,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt ?? null,
    }
  }
}

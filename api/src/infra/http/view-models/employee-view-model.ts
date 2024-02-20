import { Employee } from '@app/entities/employee'
import { env } from '@infra/env'

export class EmployeeViewModel {
  static toHttp(employee: Employee) {
    return {
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      ddd: employee.ddd,
      phone: employee.phone,
      avatar: employee.avatar
        ? `${env.STORAGE_BASE_URL}/avatar/${employee.avatar}`
        : null,
      gender: employee.gender,
      role: employee.role,
    }
  }
}

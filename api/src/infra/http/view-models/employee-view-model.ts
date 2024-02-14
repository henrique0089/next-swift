import { Employee } from '@app/entities/employee'

export class EmployeeViewModel {
  static toHttp(employee: Employee) {
    return {
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      ddd: employee.ddd,
      phone: employee.phone,
      avatar: employee.avatar,
      gender: employee.gender,
      role: employee.role,
    }
  }
}

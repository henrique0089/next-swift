import { Employee } from '@app/entities/employee'

export type PaginateParams = {
  employee?: string
  email?: string
  startDate?: Date
  endDate?: Date
  page?: number
  limit?: number
}

export interface EmployeesRepository {
  findById(id: string): Promise<Employee | null>
  findByExternalId(id: string): Promise<Employee | null>
  findByEmail(email: string): Promise<Employee | null>
  paginate(params: PaginateParams): Promise<Employee[]>
  create(employee: Employee): Promise<void>
  save(employee: Employee): Promise<void>
  delete(employeeId: string): Promise<void>
}

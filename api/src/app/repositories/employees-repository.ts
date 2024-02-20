import { Employee } from '@app/entities/employee'

export interface EmployeesRepository {
  findAll(): Promise<Employee[]>
  findById(id: string): Promise<Employee | null>
  findByExternalId(id: string): Promise<Employee | null>
  findByEmail(email: string): Promise<Employee | null>
  create(employee: Employee): Promise<void>
  save(employee: Employee): Promise<void>
  delete(employeeId: string): Promise<void>
}

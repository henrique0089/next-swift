import { Employee } from '@app/entities/employee'
import { EmployeesRepository } from '@app/repositories/employees-repository'

export class InMemoryEmployeesRepository implements EmployeesRepository {
  public employees: Employee[] = []

  async findAll(): Promise<Employee[]> {
    return this.employees
  }

  async findById(id: string): Promise<Employee | null> {
    const employee = this.employees.find((employee) => employee.id === id)

    if (!employee) {
      return null
    }

    return employee
  }

  async findByEmail(email: string): Promise<Employee | null> {
    const employee = this.employees.find((employee) => employee.email === email)

    if (!employee) {
      return null
    }

    return employee
  }

  async create(employee: Employee): Promise<void> {
    this.employees.push(employee)
  }

  async save(employee: Employee): Promise<void> {
    const employeeIndex = this.employees.findIndex(
      (data) => data.id === employee.id,
    )

    if (employeeIndex > -1) {
      this.employees[employeeIndex] = employee
    }
  }

  async delete(employeeId: string): Promise<void> {
    const employeeIndex = this.employees.findIndex(
      (employee) => employee.id === employeeId,
    )

    if (employeeIndex > -1) {
      this.employees.splice(employeeIndex, 1)
    }
  }
}

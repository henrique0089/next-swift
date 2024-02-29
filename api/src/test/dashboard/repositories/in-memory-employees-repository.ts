import { Employee } from '@app/entities/employee'
import {
  EmployeesRepository,
  PaginateParams,
} from '@app/repositories/employees-repository'

export class InMemoryEmployeesRepository implements EmployeesRepository {
  public employees: Employee[] = []

  async paginate({
    employee,
    email,
    startDate,
    endDate,
    limit = 10,
    page = 1,
  }: PaginateParams): Promise<Employee[]> {
    const start = (page - 1) * limit
    const end = page * limit

    let employees: Employee[] = []

    if (startDate && endDate && !employee && !email) {
      employees = this.employees
        .filter(
          (employee) =>
            employee.createdAt >= startDate && employee.createdAt <= endDate,
        )
        .slice(start, end)
    } else if (!startDate && !endDate && employee && !email) {
      employees = this.employees
        .filter(
          (employeeData) =>
            employeeData.firstName.toLowerCase().includes(employee) ||
            employeeData.lastName.toLowerCase().includes(employee),
        )
        .slice(start, end)
    } else if (!startDate && !endDate && !employee && email) {
      employees = this.employees
        .filter((employeeData) => employeeData.email === email)
        .slice(start, end)
    } else if (startDate && endDate && employee && !email) {
      employees = this.employees
        .filter(
          (employeeData) =>
            employeeData.createdAt >= startDate &&
            employeeData.createdAt <= endDate &&
            (employeeData.firstName.toLowerCase().includes(employee) ||
              employeeData.lastName.toLowerCase().includes(employee)),
        )
        .slice(start, end)
    } else if (startDate && endDate && !employee && !email) {
      employees = this.employees
        .filter(
          (employeeData) =>
            employeeData.createdAt >= startDate &&
            employeeData.createdAt <= endDate &&
            employeeData.email === email,
        )
        .slice(start, end)
    } else {
      employees = this.employees.slice(start, end)
    }

    return employees
  }

  async findById(id: string): Promise<Employee | null> {
    const employee = this.employees.find((employee) => employee.id === id)

    if (!employee) {
      return null
    }

    return employee
  }

  async findByExternalId(id: string): Promise<Employee | null> {
    const employee = this.employees.find(
      (employee) => employee.externalId === id,
    )

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

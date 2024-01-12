/* eslint-disable prettier/prettier */
import { Employee } from '@app/entities/employee'
import { EmployeesRepository } from '@app/repositories/employees-repository'
import { client } from '../connection'

interface EmployeeRecord {
  id: string
  name: string
  email: string
  password: string
  phone: number
  avatar: string | null
  dismissedAt: Date | null
  createdAt: Date
  updatedAt: Date | null
}

export class PGEmployeesRepository implements EmployeesRepository {
  async findAll(): Promise<Employee[]> {
    // await client.connect()

    const query = "SELECT * FROM employees"
    const result = await client.query<EmployeeRecord>(query)
    // await client.end()

    const employees: Employee[] = []

    for (const data of result.rows) {
      const employee = new Employee({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        avatar: data.avatar,
        roles: [],
        dismissedAt: data.dismissedAt,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      }, data.id)

      employees.push(employee)
    }

    return employees
  }

  async findById(id: string): Promise<Employee | null> {
    // await client.connect()

    const query = "SELECT * FROM employees WHERE id = $1 LIMIT 1"
    const result = await client.query<EmployeeRecord>(query, [id])
    // await client.end()

    if (result.rows.length === 0) {
      return null
    }

    const data = result.rows[0]

    const employee = new Employee({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      avatar: data.avatar,
      roles: [],
      dismissedAt: data.dismissedAt,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    }, data.id)

    return employee
  }

  async findByEmail(email: string): Promise<Employee | null> {
    const query = "SELECT * FROM employees WHERE email = $1 LIMIT 1"
    const result = await client.query<EmployeeRecord>(query, [email])

    if (result.rows.length === 0) {
      return null
    }

    const data = result.rows[0]

    const employee = new Employee({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      avatar: data.avatar,
      roles: [],
      dismissedAt: data.dismissedAt,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    }, data.id)

    return employee
  }

  async create(employee: Employee, roleId: string): Promise<void> {
    const { id, name, email, password, phone, avatar, dismissedAt, createdAt, updatedAt } = employee

    const query = "INSERT INTO employees (id, name, email, password, phone, avatar, dismissedAt, createdAt, updatedAt) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)"
    const values = [
      id,
      name,
      email,
      password,
      phone,
      avatar,
      dismissedAt,
      createdAt,
      updatedAt,
    ]

    await client.query(query, values)
  }

  save(employee: Employee): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(employeeId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

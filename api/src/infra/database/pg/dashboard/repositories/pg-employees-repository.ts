/* eslint-disable prettier/prettier */
import { Employee } from '@app/dashboard/entities/employee'
import { EmployeesRepository } from '@app/dashboard/repositories/employees-repository'
import { randomUUID } from 'node:crypto'
import { client } from '../../connection'

interface EmployeeRecord {
  id: string
  name: string
  email: string
  phone: number
  avatar: string | null
  dismissedAt: Date | null
  createdAt: Date
  updatedAt: Date | null
}

export class PGEmployeesRepository implements EmployeesRepository {
  async findAll(): Promise<Employee[]> {
    const query = "SELECT * FROM employees"
    const result = await client.query<EmployeeRecord>(query)

    const employees: Employee[] = []

    for (const data of result.rows) {
      const employee = new Employee({
        name: data.name,
        email: data.email,
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
    const query = "SELECT * FROM employees WHERE id = $1 LIMIT 1"
    const result = await client.query<EmployeeRecord>(query, [id])

    if (result.rows.length === 0) {
      return null
    }

    const data = result.rows[0]

    const employee = new Employee({
      name: data.name,
      email: data.email,
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
    const { id, name, email, phone, avatar, dismissedAt, createdAt, updatedAt } = employee

    const query = "INSERT INTO employees (id, name, email, phone, avatar, dismissedAt, createdAt, updatedAt) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)"
    const values = [
      id,
      name,
      email,
      phone,
      avatar,
      dismissedAt,
      createdAt,
      updatedAt,
    ]

    await client.query(query, values)
    await client.query("INSERT INTO employee_roles (id, employee_id, role_id) VALUES ($1, $2, $3)", [randomUUID(), id, roleId])
  }

  async save(employee: Employee): Promise<void> {
    const { id, name, email, phone, avatar, dismissedAt, createdAt, updatedAt } = employee

    const query = "UPDATE employees SET name = $1, email = $2, phone = $3, avatar = $4, dismissedAt = $5, createdAt = $6, updatedAt = $7 WHERE id = $8"
    const values = [
      name,
      email,
      phone,
      avatar,
      dismissedAt,
      createdAt,
      updatedAt,
      id,
    ]

    await client.query(query, values)
  }

  async delete(employeeId: string): Promise<void> {
    const query = "DELETE FROM users WHERE id = $1"

    await client.query(query, [employeeId])
  }
}

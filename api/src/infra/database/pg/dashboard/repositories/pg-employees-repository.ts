/* eslint-disable prettier/prettier */
import { Employee } from '@app/dashboard/entities/employee'
import { Role } from '@app/dashboard/entities/role'
import { EmployeesRepository } from '@app/dashboard/repositories/employees-repository'
import { client } from '../../connection'

interface EmployeeRecord {
  id: string
  first_name: string
  last_name: string
  email: string
  ddd: number
  phone: number
  avatar: string | null
  dismissedAt: Date | null
  createdAt: Date
  updatedAt: Date | null
  role_id: string
  role_name: string
  role_created_at: Date
}

export class PGEmployeesRepository implements EmployeesRepository {
  async findAll(): Promise<Employee[]> {
    const query = `
      SELECT e.id, e.first_name, e.last_name, e.email, e.ddd, e.phone, e.avatar, e.dismissed_at, e.created_at, e.updated_at, r.id AS role_id, r.name AS role_name, r.created_at AS role_created_at 
      FROM employees e
      JOIN roles r ON e.role_id = r.id
    `
    const result = await client.query<EmployeeRecord>(query)

    const employees: Employee[] = []

    for (const data of result.rows) {
      const employee = new Employee({
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        ddd: data.ddd,
        phone: data.phone,
        avatar: data.avatar,
        role: new Role({
          name: data.role_name,
          createdAt: data.role_created_at
        }, data.role_id),
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
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      ddd: data.ddd,
      phone: data.phone,
      avatar: data.avatar,
      role: new Role({
        name: 'admin',
        createdAt: new Date()
      }, 'sdsdjh'),
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
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      ddd: data.ddd,
      phone: data.phone,
      avatar: data.avatar,
      role: new Role({
        name: 'admin',
      }, 'sdsdjh'),
      dismissedAt: data.dismissedAt,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    }, data.id)

    return employee
  }

  async create(employee: Employee, roleId: string): Promise<void> {
    const { id, firstName, lastName, email, ddd, phone, avatar, dismissedAt, createdAt, updatedAt } = employee

    const query = "INSERT INTO employees (id, first_name, last_name, email, ddd, phone, avatar, role_id, dismissed_at, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)"
    const values = [
      id,
      firstName,
      lastName,
      email,
      ddd,
      phone,
      avatar,
      roleId,
      dismissedAt,
      createdAt,
      updatedAt,
    ]

    await client.query(query, values)
  }

  async save(employee: Employee): Promise<void> {
    const { id, firstName, lastName, email, ddd, phone, avatar, dismissedAt, createdAt, updatedAt } = employee

    const query = "UPDATE employees SET first_name = $1, last_name = $2, email = $3, ddd = $4, phone = $5, avatar = $6, dismissedAt = $7, updatedAt = $8 WHERE id = $9"
    const values = [
      firstName,
      lastName,
      email,
      ddd,
      phone,
      avatar,
      dismissedAt,
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

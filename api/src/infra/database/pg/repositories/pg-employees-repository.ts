import { Employee, Gender, Role } from '@app/entities/employee'
import { EmployeesRepository } from '@app/repositories/employees-repository'
import { client } from '../connection'

interface EmployeeRecord {
  id: string
  first_name: string
  last_name: string
  email: string
  ddd: number
  phone: number
  avatar: string | null
  gender: Gender
  role: Role
  dismissedAt: Date | null
  createdAt: Date
  updatedAt: Date | null
}

export class PGEmployeesRepository implements EmployeesRepository {
  async findAll(): Promise<Employee[]> {
    const query = `SELECT e.id, e.first_name, e.last_name, e.email, e.ddd, e.phone, e.avatar, e.gender, e.role, e.dismissed_at, e.created_at, e.updated_at 
      FROM employees e
      `
    const result = await client.query<EmployeeRecord>(query)

    const employees: Employee[] = []

    for (const data of result.rows) {
      const employee = new Employee(
        {
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          ddd: data.ddd,
          phone: data.phone,
          avatar: data.avatar,
          gender: data.gender,
          role: data.role,
          dismissedAt: data.dismissedAt,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        },
        data.id,
      )

      employees.push(employee)
    }

    return employees
  }

  async findById(id: string): Promise<Employee | null> {
    const query = `SELECT * FROM employees WHERE id = $1 LIMIT 1`
    const result = await client.query<EmployeeRecord>(query, [id])

    if (result.rows.length === 0) {
      return null
    }

    const data = result.rows[0]

    const employee = new Employee(
      {
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        ddd: data.ddd,
        phone: data.phone,
        avatar: data.avatar,
        gender: data.gender,
        role: data.role,
        dismissedAt: data.dismissedAt,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
      data.id,
    )

    return employee
  }

  async findByEmail(email: string): Promise<Employee | null> {
    const query = `SELECT * FROM employees WHERE email = $1 LIMIT 1`
    const result = await client.query<EmployeeRecord>(query, [email])

    if (result.rows.length === 0) {
      return null
    }

    const data = result.rows[0]

    const employee = new Employee(
      {
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        ddd: data.ddd,
        phone: data.phone,
        avatar: data.avatar,
        gender: data.gender,
        role: data.role,
        dismissedAt: data.dismissedAt,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
      data.id,
    )

    return employee
  }

  async create(employee: Employee): Promise<void> {
    const {
      id,
      firstName,
      lastName,
      email,
      ddd,
      phone,
      avatar,
      gender,
      role,
      dismissedAt,
      createdAt,
      updatedAt,
    } = employee

    const query = `INSERT INTO employees (id, first_name, last_name, email, ddd, phone, avatar, gender, role, dismissed_at, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `
    const values = [
      id,
      firstName,
      lastName,
      email,
      ddd,
      phone,
      avatar,
      gender,
      role,
      dismissedAt,
      createdAt,
      updatedAt,
    ]

    await client.query(query, values)
  }

  async save(employee: Employee): Promise<void> {
    const {
      id,
      firstName,
      lastName,
      email,
      ddd,
      phone,
      avatar,
      dismissedAt,
      updatedAt,
    } = employee

    const query =
      'UPDATE employees SET first_name = $1, last_name = $2, email = $3, ddd = $4, phone = $5, avatar = $6, dismissedAt = $7, updatedAt = $8 WHERE id = $9'
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
    const query = `DELETE FROM users WHERE id = $1`

    await client.query(query, [employeeId])
  }
}

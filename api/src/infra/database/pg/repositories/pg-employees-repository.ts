import { Employee, Gender, Role } from '@app/entities/employee'
import {
  EmployeesRepository,
  PaginateParams,
} from '@app/repositories/employees-repository'
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
  external_id: string
  dismissed_at: Date | null
  created_at: Date
  updated_at: Date | null
}

export class PGEmployeesRepository implements EmployeesRepository {
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
        externalId: data.external_id,
        dismissedAt: data.dismissed_at,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
      data.id,
    )

    return employee
  }

  async findByExternalId(id: string): Promise<Employee | null> {
    const query = `SELECT * FROM employees WHERE external_id = $1 LIMIT 1`
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
        externalId: data.external_id,
        dismissedAt: data.dismissed_at,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
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
        externalId: data.external_id,
        dismissedAt: data.dismissed_at,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
      data.id,
    )

    return employee
  }

  async paginate({
    employee,
    email,
    document,
    startDate,
    endDate,
    limit = 10,
    page = 1,
  }: PaginateParams): Promise<Employee[]> {
    const offset = (page - 1) * limit

    let query = ''
    const values: any[] = []

    if (startDate && endDate && !employee && !email && !document) {
      query = `SELECT * FROM employees
          WHERE created_at BETWEEN $1 AND $2
          ORDER BY created_at
          LIMIT $3 OFFSET $4
        `

      values.push(startDate)
      values.push(endDate)
      values.push(limit)
      values.push(offset)
    } else if (!startDate && !endDate && employee && !email && !document) {
      query = `SELECT *
        FROM employees
        WHERE (first_name ILIKE $1 OR last_name ILIKE $1)
        ORDER BY created_at
        LIMIT $2 OFFSET $3
      `

      values.push(`%${employee}%`)
      values.push(limit)
      values.push(offset)
    } else if (!startDate && !endDate && !employee && email && !document) {
      query = `SELECT * FROM employees
        WHERE email = $1
        ORDER BY created_at
        LIMIT $2 OFFSET $3
      `

      values.push(email)
      values.push(limit)
      values.push(offset)
    } else if (!startDate && !endDate && !employee && !email && document) {
      query = `SELECT * FROM employees
        WHERE document = $1
        ORDER BY created_at
        LIMIT $2 OFFSET $3
      `

      values.push(document)
      values.push(limit)
      values.push(offset)
    } else if (startDate && endDate && employee && email && document) {
      query = `SELECT *
        FROM employees
        WHERE (created_at BETWEEN $1 AND $2) AND (first_name ILIKE $3 OR last_name ILIKE $3) AND (email = $4) AND (document = $5)
        ORDER BY created_at
        LIMIT $6 OFFSET $7
      `

      values.push(startDate)
      values.push(endDate)
      values.push(`%${employee}%`)
      values.push(email)
      values.push(document)
      values.push(limit)
      values.push(offset)
    } else {
      query = `SELECT * FROM employees
        ORDER BY created_at
        LIMIT $1 OFFSET $2
      `

      values.push(limit)
      values.push(offset)
    }

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
          externalId: data.external_id,
          dismissedAt: data.dismissed_at,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        },
        data.id,
      )

      employees.push(employee)
    }

    return employees
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
      externalId,
      dismissedAt,
      createdAt,
      updatedAt,
    } = employee

    const query = `INSERT INTO employees (id, first_name, last_name, email, ddd, phone, avatar, gender, role, external_id, dismissed_at, created_at, updated_at) 
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
      externalId,
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
      'UPDATE employees SET first_name = $1, last_name = $2, email = $3, ddd = $4, phone = $5, avatar = $6, dismissed_at = $7, updated_at = $8 WHERE id = $9'
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

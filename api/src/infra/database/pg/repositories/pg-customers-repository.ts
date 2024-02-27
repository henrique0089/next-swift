import { Customer } from '@app/entities/customer'
import { Address } from '@app/entities/customer/address'
import {
  CustomersRepository,
  PaginateParams,
  PaginateResponse,
} from '@app/repositories/customer-repository'
import { client } from '../connection'

interface CustomerRecord {
  id: string
  name: string
  email: string
  document: string
  ddd: number
  phone: number
  created_at: Date
  updated_at: Date | null
  address_id: string
  street: string
  number: number
  complement: string | null
  city: string
  state: string
  postal_code: string
  address_created_at: Date
}

export class PGCustomersRepository implements CustomersRepository {
  async findById(customerId: string): Promise<Customer | null> {
    const query = `SELECT customers.id, customers.name, customers.email, customers.document, customers.ddd, customers.phone, customers.created_at, customers.updated_at, a.id AS address_id, a.street, a.number, a.complement, a.city, a.state, a.postal_code, a.created_at AS address_created_at
        FROM customers
        JOIN addresses a ON customers.address_id = a.id
        WHERE customers.id = $1 LIMIT 1
      `
    const { rows } = await client.query<CustomerRecord>(query, [customerId])

    if (rows.length === 0) {
      return null
    }

    const data = rows[0]

    const customer = new Customer(
      {
        name: data.name,
        email: data.email,
        document: data.document,
        ddd: data.ddd,
        phone: data.phone,
        address: new Address(
          {
            street: data.street,
            number: data.number,
            complement: data.complement,
            state: data.state,
            city: data.city,
            postalCode: data.postal_code,
            createdAt: data.address_created_at,
          },
          data.address_id,
        ),
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
      data.id,
    )

    return customer
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const query = `SELECT c.id, c.name, c.email, c.document, c.ddd, c.phone, c.created_at, c.updated_at, a.id AS address_id, a.street, a.number, a.complement, a.city, a.state, a.postal_code, a.created_at AS address_created_at 
        FROM customers c
        JOIN addresses a ON c.address_id = a.id
        WHERE email = $1 LIMIT 1
      `
    const { rows } = await client.query<CustomerRecord>(query, [email])

    if (rows.length === 0) {
      return null
    }

    const data = rows[0]

    const customer = new Customer(
      {
        name: data.name,
        email: data.email,
        document: data.document,
        ddd: data.ddd,
        phone: data.phone,
        address: new Address(
          {
            street: data.street,
            number: data.number,
            complement: data.complement,
            state: data.state,
            city: data.city,
            postalCode: data.postal_code,
            createdAt: data.address_created_at,
          },
          data.address_id,
        ),
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
      data.id,
    )

    return customer
  }

  async paginate({
    customer,
    email,
    document,
    startDate,
    endDate,
    limit = 10,
    page = 1,
  }: PaginateParams): Promise<PaginateResponse> {
    const offset = (page - 1) * limit

    let query = ''
    const values: any[] = []

    if (startDate && endDate && !customer && !email && !document) {
      query = `SELECT c.id, c.name, c.email, c.document, c.ddd, c.phone, c.created_at, c.updated_at, a.id As address_id, a.street, a.number, a.complement, a.city, a.state, a.postal_code, a.created_at AS address_created_at
        FROM customers c
        JOIN addresses a ON a.id = c.address_id
        WHERE c.created_at BETWEEN $1 AND $2
        ORDER BY c.created_at
        LIMIT $3 OFFSET $4
      `

      values.push(startDate)
      values.push(endDate)
      values.push(limit)
      values.push(offset)
    } else if (!startDate && !endDate && customer && !email && !document) {
      query = `SELECT c.id, c.name, c.email, c.document, c.ddd, c.phone, c.created_at, c.updated_at, a.id As address_id, a.street, a.number, a.complement, a.city, a.state, a.postal_code, a.created_at AS address_created_at
        FROM customers c
        JOIN addresses a ON a.id = c.address_id
        WHERE c.name ILIKE $1
        ORDER BY c.created_at
        LIMIT $2 OFFSET $3
      `

      values.push(`%${customer}%`)
      values.push(limit)
      values.push(offset)
    } else if (!startDate && !endDate && !customer && email && !document) {
      query = `SELECT c.id, c.name, c.email, c.document, c.ddd, c.phone, c.created_at, c.updated_at, a.id As address_id, a.street, a.number, a.complement, a.city, a.state, a.postal_code, a.created_at AS address_created_at
        FROM customers c
        JOIN addresses a ON a.id = c.address_id
        WHERE c.email = $1
        ORDER BY c.created_at
        LIMIT $2 OFFSET $3
      `

      values.push(email)
      values.push(limit)
      values.push(offset)
    } else if (!startDate && !endDate && !customer && !email && document) {
      query = `SELECT c.id, c.name, c.email, c.document, c.ddd, c.phone, c.created_at, c.updated_at, a.id As address_id, a.street, a.number, a.complement, a.city, a.state, a.postal_code, a.created_at AS address_created_at
        FROM customers c
        JOIN addresses a ON a.id = c.address_id
        WHERE c.document = $1
        ORDER BY c.created_at
        LIMIT $2 OFFSET $3
      `

      values.push(document)
      values.push(limit)
      values.push(offset)
    } else if (startDate && endDate && customer && email && document) {
      query = `SELECT c.id, c.name, c.email, c.document, c.ddd, c.phone, c.created_at, c.updated_at, a.id As address_id, a.street, a.number, a.complement, a.city, a.state, a.postal_code, a.created_at AS address_created_at
        FROM customers c
        JOIN addresses a ON a.id = c.address_id
        WHERE (c.created_at BETWEEN $1 AND $2) AND (c.name ILIKE $3) AND (c.email = $4) AND (c.document = $5)
        ORDER BY c.created_at
        LIMIT $6 OFFSET $7
      `

      values.push(startDate)
      values.push(endDate)
      values.push(`%${customer}%`)
      values.push(email)
      values.push(document)
      values.push(limit)
      values.push(offset)
    } else {
      query = `SELECT c.id, c.name, c.email, c.document, c.ddd, c.phone, c.created_at, c.updated_at, a.id As address_id, a.street, a.number, a.complement, a.city, a.state, a.postal_code, a.created_at AS address_created_at
        FROM customers c
        JOIN addresses a ON a.id = c.address_id
        ORDER BY c.created_at
        LIMIT $1 OFFSET $2
      `

      values.push(limit)
      values.push(offset)
    }

    const { rows } = await client.query<CustomerRecord>(query, values)
    const res = await client.query(`SELECT COUNT(*) FROM customers;`)

    const customers: Customer[] = []

    for (const data of rows) {
      const customer = new Customer(
        {
          name: data.name,
          email: data.email,
          document: data.document,
          ddd: data.ddd,
          phone: data.phone,
          address: new Address(
            {
              street: data.street,
              number: data.number,
              complement: data.complement,
              state: data.state,
              city: data.city,
              postalCode: data.postal_code,
              createdAt: data.address_created_at,
            },
            data.address_id,
          ),
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        },
        data.id,
      )

      customers.push(customer)
    }

    return { customers, totalCount: Number(res.rows[0].count) }
  }

  async create(customer: Customer): Promise<void> {
    const { id, name, email, document, ddd, phone, createdAt, updatedAt } =
      customer

    const customerQuery = `INSERT INTO customers (id, name, email, document, ddd, phone, address_id, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`

    const addrsQuery = `INSERT INTO addresses (id, street, number, complement, city, state, postal_code, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`

    const addrsVals = [
      customer.address.id,
      customer.address.street,
      customer.address.number,
      customer.address.complement,
      customer.address.city,
      customer.address.state,
      customer.address.postalCode,
      customer.address.createdAt,
    ]

    await client.query(addrsQuery, addrsVals)
    await client.query(customerQuery, [
      id,
      name,
      email,
      document,
      ddd,
      phone,
      customer.address.id,
      createdAt,
      updatedAt,
    ])
  }

  async save(customer: Customer): Promise<void> {
    const { id, name, email, document, ddd, phone, updatedAt } = customer

    const query = `UPDATE customers
      SET name = $1, email = $2, document = $3, ddd = $4, phone = $5, updated_at = $6
      WHERE id = $7
      `

    await client.query(query, [
      name,
      email,
      document,
      ddd,
      phone,
      updatedAt,
      id,
    ])
  }

  async delete(customer: Customer): Promise<void> {
    const customerQuery = `DELETE FROM customers WHERE id = $1`
    const addressQuery = `DELETE FROM addresses WHERE id = $1`

    await Promise.all([
      client.query(customerQuery, [customer.id]),
      client.query(addressQuery, [customer.address.id]),
    ])
  }

  async getCurrentMonthTotalCount(): Promise<number> {
    const query = `SELECT COUNT(*) FROM customers WHERE EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE)`

    const { rows } = await client.query<{ count: number }>(query)

    const total = Number(rows[0].count)

    return total
  }

  async getLastMonthTotalCount(): Promise<number> {
    const query = `SELECT COUNT(*) FROM customers WHERE EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE - interval '1 month')`

    const { rows } = await client.query<{ count: number }>(query)

    const total = rows[0].count

    return total
  }
}

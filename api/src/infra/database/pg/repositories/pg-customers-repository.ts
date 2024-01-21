/* eslint-disable prettier/prettier */
import { Customer } from '@app/entities/customer'
import { Address } from '@app/entities/customer/address'
import {
  CustomersRepository,
  PaginateParams,
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
    const query = 
      `SELECT customers.id, customers.name, customers.email, customers.document, customers.ddd, customers.phone, customers.created_at, customers.updated_at, a.id AS address_id, a.street, a.number, a.complement, a.city, a.state, a.postal_code, a.created_at AS address_created_at
        FROM customers
        JOIN addresses a ON customers.address_id = a.id
        WHERE customers.id = $1 LIMIT 1
      `
    const { rows } = await client.query<CustomerRecord>(query, [customerId])

    if (rows.length === 0) {
      return null
    }

    const data = rows[0]

    const customer = new Customer({
      name: data.name,
      email: data.email,
      cpf: data.document,
      ddd: data.ddd,
      phone: data.phone,
      address: new Address({
        street: data.street,
        number: data.number,
        complement: data.complement,
        state: data.state,
        city: data.city,
        postalCode: data.postal_code,
        createdAt: data.address_created_at
      }, data.address_id),
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    }, data.id)

    return customer
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const query = 
      `SELECT c.id, c.name, c.email, c.document, c.ddd, c.phone, c.created_at, c.updated_at, a.id AS address_id, a.street, a.number, a.complement, a.city, a.state, a.postal_code, a.created_at AS address_created_at 
        FROM customers c
        JOIN addresses a ON c.address_id = a.id
        WHERE email = $1 LIMIT 1
      `
    const { rows } = await client.query<CustomerRecord>(query, [email])

    if (rows.length === 0) {
      return null
    }

    const data = rows[0]

    const customer = new Customer({
      name: data.name,
      email: data.email,
      cpf: data.document,
      ddd: data.ddd,
      phone: data.phone,
      address: new Address({
        street: data.street,
        number: data.number,
        complement: data.complement,
        state: data.state,
        city: data.city,
        postalCode: data.postal_code,
        createdAt: data.address_created_at
      }, data.address_id),
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    }, data.id)

    return customer
  }

  async paginate({ limit, page }: PaginateParams): Promise<Customer[]> {
    const offset = (page - 1) * limit;
    const query = 
      `SELECT c.id, c.name, c.email, c.document, c.ddd, c.phone, c.created_at, c.updated_at, a.id As address_id, a.street, a.number, a.complement, a.city, a.state, a.postal_code, a.created_at AS address_created_at
      FROM customers c
      JOIN addresses a ON a.id = c.address_id
      ORDER BY c.created_at
      LIMIT $1 OFFSET $2
      `
    const { rows } = await client.query<CustomerRecord>(query, [limit, offset])

    const customers: Customer[] = []

    for (const data of rows) {
      const customer = new Customer({
        name: data.name,
        email: data.email,
        cpf: data.document,
        ddd: data.ddd,
        phone: data.phone,
        address: new Address({
          street: data.street,
          number: data.number,
          complement: data.complement,
          state: data.state,
          city: data.city,
          postalCode: data.postal_code,
          createdAt: data.address_created_at
        }, data.address_id),
        createdAt: data.created_at,
        updatedAt: data.updated_at
      })
  
      customers.push(customer)
    }

    return customers
  }
  // async paginate({ limit, page }: PaginateParams): Promise<Customer[]> {
  //   const offset = (page - 1) * limit;
  //   const query = 
  //     `SELECT c.id, c.name, c.email, c.document, c.ddd, c.phone, c.created_at, c.updated_at, 
  //     ARRAY_AGG(
  //       JSON_BUILD_OBJECT(
  //         'id', a.id,
  //         'street', a.street,
  //         'number', a.number,
  //         'complement', a.complement,
  //         'city', a.city,
  //         'state', a.state,
  //         'postal_code', a.postal_code,
  //         'created_at', a.created_at
  //       )
  //     ) AS addresses
  //     FROM customers c
  //     JOIN addresses a ON a.customer_id = c.id
  //     GROUP BY c.id, c.name, c.email, c.document, c.ddd, c.phone, c.created_at, c.updated_at
  //     ORDER BY c.created_at
  //     LIMIT $1 OFFSET $2
  //     `

  //   const { rows } = await client.query<CustomerRecord>(query, [limit, offset])

  //   const customers: Customer[] = []

    // for (const data of rows) {
    //   const customer = new Customer({
    //     name: data.name,
    //     email: data.email,
    //     cpf: data.document,
    //     ddd: data.ddd,
    //     phone: data.phone,
    //     addresses: data.addresses.map((address) => {
    //       return new Address({
    //         street: address.street,
    //         number: address.number,
    //         complement: address.complement,
    //         state: address.state,
    //         city: address.city,
    //         postalCode: address.postal_code,
    //         createdAt: address.created_at
    //       })
    //     }),
    //     createdAt: data.created_at,
    //     updatedAt: data.updated_at
    //   })

  //     customers.push(customer)
  //   }

  //   return customers
  // }

  async create(customer: Customer): Promise<void> {
    const { id, name, email, cpf, ddd, phone, createdAt, updatedAt } = customer

    const customerQuery = 
      `INSERT INTO customers (id, name, email, document, ddd, phone, address_id, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`

    const addrsQuery = 
    `INSERT INTO addresses (id, street, number, complement, city, state, postal_code, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`

    const addrsVals = [
      customer.address.id,
      customer.address.street,
      customer.address.number,
      customer.address.complement,
      customer.address.city,
      customer.address.state,
      customer.address.postalCode,
      customer.address.createdAt
    ]

    await client.query(customerQuery, [id, name, email, cpf, ddd, phone, customer.address.id, createdAt, updatedAt])
    await client.query(addrsQuery, addrsVals)
  }

  // async create(customer: Customer): Promise<void> {
  //   const { id, name, email, cpf, ddd, phone, createdAt, updatedAt } = customer

    // const customerQuery = 
    //   `INSERT INTO customers (id, name, email, document, ddd, phone, created_at, updated_at)
    //   VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`
      
  //   const addrValuesPlaceholder = customer.addresses.map((_, i) => `($${i * 9 + 1}, $${i * 9 + 2}, $${i * 9 + 3}, $${i * 9 + 4}, $${i * 9 + 5}, $${i * 9 + 6}, $${i * 9 + 7}, $${i * 9 + 8}, $${i * 9 + 9})`).join(', ');
    
    // const addrsQuery = 
    //   `INSERT INTO addresses (id, street, number, complement, city, state, postal_code, customer_id, created_at)
    //   VALUES ${addrValuesPlaceholder};`
      
  //   const addrsVals = customer.addresses.flatMap((addr) => [addr.id, addr.street, addr.number, addr.complement, addr.city, addr.state, addr.postalCode, customer.id, addr.createdAt])  

    // await client.query(customerQuery, [id, name, email, cpf, ddd, phone, createdAt, updatedAt])
    // await client.query(addrsQuery, addrsVals)
  // }

  async save(customer: Customer): Promise<void> {
    const { id, name, email, cpf, ddd, phone, updatedAt } = customer

    const query = 
      `UPDATE customers
      SET name = $1, email = $2, document = $3, ddd = $4, phone = $5, updated_at = $6
      WHERE id = $7
      `

    await client.query(query, [name, email, cpf, ddd, phone, updatedAt, id])
  }

  async delete(customerId: string): Promise<void> {
    const query = "DELETE customers WHERE id = $1"

    await client.query(query, [customerId])
  }
}

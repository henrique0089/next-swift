/* eslint-disable prettier/prettier */
import { Supplier } from '@app/entities/supplier'
import { Address } from '@app/entities/supplier/address'
import { PaginateParams, SuppliersRepository } from '@app/repositories/suppliers-repository'
import { client } from '../connection'

interface SupplierRecord {
  id: string
  name: string
  email: string
  document: string
  ddd: number
  phone: number
  created_at: Date
  updated_at: Date | null
  addresses: {
    id: string
    street: string
    number: number
    complement: string | null
    city: string
    state: string
    postal_code: string
    created_at: Date
  }[]
}

export class PGSuppliersRepository implements SuppliersRepository {
  async findById(supplierId: string): Promise<Supplier | null> {
    const query = 
      `SELECT s.id, s.name, s.email, s.document, s.ddd, s.phone, s.created_at, s.updated_at,
        ARRAY_AGG(
          JSON_BUILD_OBJECT(
            'id', a.id,
            'street', a.street,
            'number', a.number,
            'complement', a.complement,
            'city', a.city,
            'state', a.state,
            'postal_code', a.postal_code,
            'created_at', a.created_at
          )
        ) AS addresses
        FROM suppliers s
        JOIN suppliers_addresses a ON a.supplier_id = s.id
        WHERE s.id = $1 LIMIT 1
      `
    const { rows } = await client.query<SupplierRecord>(query, [supplierId])

    if (rows.length === 0) {
      return null
    }

    const data = rows[0]

    const supplier = new Supplier({
      name: data.name,
      email: data.email,
      cnpj: data.document,
      ddd: data.ddd,
      phone: data.phone,
      addresses: data.addresses.map((address) => {
        return new Address({
          street: address.street,
          number: address.number,
          complement: address.complement,
          state: address.state,
          city: address.city,
          postalCode: address.postal_code,
          createdAt: address.created_at
        }, address.id)
      }),
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    }, data.id)

    return supplier
  }

  async findByEmail(email: string): Promise<Supplier | null> {
    const query = 
      `SELECT s.id, s.name, s.email, s.document, s.ddd, s.phone, s.created_at, s.updated_at,
        ARRAY_AGG(
          JSON_BUILD_OBJECT(
            'id', a.id,
            'street', a.street,
            'number', a.number,
            'complement', a.complement,
            'city', a.city,
            'state', a.state,
            'postal_code', a.postal_code,
            'created_at', a.created_at
          )
        ) AS addresses
        FROM suppliers s
        JOIN suppliers_addresses a ON a.supplier_id = s.id
        WHERE s.email = $1 
        LIMIT 1
      `
    const { rows } = await client.query<SupplierRecord>(query, [email])

    if (rows.length === 0) {
      return null
    }

    const data = rows[0]

    const supplier = new Supplier({
      name: data.name,
      email: data.email,
      cnpj: data.document,
      ddd: data.ddd,
      phone: data.phone,
      addresses: data.addresses.map((address) => {
        return new Address({
          street: address.street,
          number: address.number,
          complement: address.complement,
          state: address.state,
          city: address.city,
          postalCode: address.postal_code,
          createdAt: address.created_at
        }, address.id)
      }),
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    }, data.id)

    return supplier
  }
  // async paginate({ limit, page }: PaginateParams): Promise<Customer[]> {
  //   const offset = (page - 1) * limit;
  //   const query = 
  //     `SELECT c.id, c.name, c.email, c.document, c.ddd, c.phone, c.created_at, c.updated_at, a.id As address_id, a.street, a.number, a.complement, a.city, a.state, a.postal_code, a.created_at AS address_created_at
  //     FROM customers c
  //     JOIN addresses a ON a.id = c.address_id
  //     ORDER BY c.created_at
  //     LIMIT $1 OFFSET $2
  //     `
  //   const { rows } = await client.query<SupplierRecord>(query, [limit, offset])

  //   const customers: Customer[] = []

  //   for (const data of rows) {
  //     const customer = new Customer({
  //       name: data.name,
  //       email: data.email,
  //       cpf: data.document,
  //       ddd: data.ddd,
  //       phone: data.phone,
  //       address: new Address({
  //         street: data.street,
  //         number: data.number,
  //         complement: data.complement,
  //         state: data.state,
  //         city: data.city,
  //         postalCode: data.postal_code,
  //         createdAt: data.address_created_at
  //       }, data.address_id),
  //       createdAt: data.created_at,
  //       updatedAt: data.updated_at
  //     })
  
  //     customers.push(customer)
  //   }

  //   return customers
  // }

  async paginate({ limit, page }: PaginateParams): Promise<Supplier[]> {
    const offset = (page - 1) * limit
    const query = 
      `SELECT c.id, c.name, c.email, c.document, c.ddd, c.phone, c.created_at, c.updated_at, 
      ARRAY_AGG(
        JSON_BUILD_OBJECT(
          'id', a.id,
          'street', a.street,
          'number', a.number,
          'complement', a.complement,
          'city', a.city,
          'state', a.state,
          'postal_code', a.postal_code,
          'created_at', a.created_at
        )
      ) AS addresses
      FROM suppliers c
      JOIN suppliers_addresses a ON a.supplier_id = c.id
      GROUP BY c.id, c.name, c.email, c.document, c.ddd, c.phone, c.created_at, c.updated_at
      ORDER BY c.created_at DESC
      LIMIT $1 OFFSET $2
      `

    const { rows } = await client.query<SupplierRecord>(query, [limit, offset])

    const suppliers: Supplier[] = []

    for (const data of rows) {
      const supplier = new Supplier({
        name: data.name,
        email: data.email,
        cnpj: data.document,
        ddd: data.ddd,
        phone: data.phone,
        addresses: data.addresses.map((address) => {
          return new Address({
            street: address.street,
            number: address.number,
            complement: address.complement,
            state: address.state,
            city: address.city,
            postalCode: address.postal_code,
            createdAt: address.created_at
          }, address.id)
        }),
        createdAt: data.created_at,
        updatedAt: data.updated_at
      })

      suppliers.push(supplier)
    }

    return suppliers
  }

  async create(supplier: Supplier): Promise<void> {
    const { id, name, email, cnpj, ddd, phone, createdAt, updatedAt } = supplier

    const supplierQuery = 
      `INSERT INTO suppliers (id, name, email, document, ddd, phone, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`
      
    const addrValuesPlaceholder = supplier.addresses.map((_, i) => `($${i * 9 + 1}, $${i * 9 + 2}, $${i * 9 + 3}, $${i * 9 + 4}, $${i * 9 + 5}, $${i * 9 + 6}, $${i * 9 + 7}, $${i * 9 + 8}, $${i * 9 + 9})`).join(', ');
    
    const addrsQuery = 
      `INSERT INTO suppliers_addresses (id, street, number, complement, city, state, postal_code, supplier_id, created_at)
      VALUES ${addrValuesPlaceholder};`
      
    const addrsVals = supplier.addresses.flatMap((addr) => [addr.id, addr.street, addr.number, addr.complement, addr.city, addr.state, addr.postalCode, supplier.id, addr.createdAt])  
 
    await Promise.all([
      client.query(supplierQuery, [id, name, email, cnpj, ddd, phone, createdAt, updatedAt]),
      client.query(addrsQuery, addrsVals)
    ])
  }

  async save(supplier: Supplier): Promise<void> {
    const { id, name, email, cnpj, ddd, phone, updatedAt } = supplier

    const query = 
      `UPDATE suppliers
      SET name = $1, email = $2, document = $3, ddd = $4, phone = $5, updated_at = $6
      WHERE id = $7
      `

    await client.query(query, [name, email, cnpj, ddd, phone, updatedAt, id])
  }

  async delete(supplierId: string): Promise<void> {
    const query = "DELETE suppliers WHERE id = $1"

    await client.query(query, [supplierId])
  }
}

import { describe, expect, it } from 'vitest'
import { Supplier } from '.'
import { Address } from './address'

describe('Supplier Entity', () => {
  it('should be able to instantiate a new supplier', () => {
    const supplier = new Supplier({
      name: 'jhon doe',
      email: 'jhondoe@gmail.com',
      cnpj: '000.000.000-00',
      ddd: 88,
      phone: 999999999,
      addresses: [
        new Address({
          street: 'street',
          number: 31,
          complement: 'complement',
          city: 'são paulo',
          state: 'SP',
          postalCode: '85.300-000',
        }),
      ],
      updatedAt: null,
    })

    expect(supplier).toBeInstanceOf(Supplier)
    expect(supplier.id).toBeDefined()
    expect(supplier.name).toBe('jhon doe')
    expect(supplier.email).toBe('jhondoe@gmail.com')
    expect(supplier.cnpj).toBe('000.000.000-00')
    expect(supplier.ddd).toBe(88)
    expect(supplier.phone).toBe(999999999)
  })
})

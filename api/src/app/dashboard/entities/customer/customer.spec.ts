import { describe, expect, it } from 'vitest'
import { Customer } from '.'

describe('Customer entity', () => {
  it('should be able to instantiate a new customer', () => {
    const customer = new Customer({
      name: 'jhon doe',
      email: 'jhondoe@gmail.com',
      cpf: '000.000.000-00',
      ddd: 88,
      phone: 999999999,
      addresses: [],
      updatedAt: null,
    })

    expect(customer).toBeInstanceOf(Customer)
    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('jhon doe')
    expect(customer.email).toBe('jhondoe@gmail.com')
    expect(customer.cpf).toBe('000.000.000-00')
    expect(customer.ddd).toBe(88)
    expect(customer.phone).toBe(999999999)
  })
})

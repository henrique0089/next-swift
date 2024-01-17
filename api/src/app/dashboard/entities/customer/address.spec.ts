import { describe, expect, it } from 'vitest'
import { Address } from './address'

describe('Address entity', () => {
  it('should be able to instantiate a new address', () => {
    const address = new Address({
      street: 'street',
      number: 31,
      complement: 'complement',
      city: 'são paulo',
      state: 'SP',
      postalCode: '85.300-000',
    })

    expect(address).toBeInstanceOf(Address)
    expect(address.id).toBeDefined()
    expect(address.street).toBe('street')
    expect(address.number).toBe(31)
    expect(address.complement).toBe('complement')
    expect(address.city).toBe('são paulo')
    expect(address.state).toBe('SP')
    expect(address.postalCode).toBe('85.300-000')
  })
})

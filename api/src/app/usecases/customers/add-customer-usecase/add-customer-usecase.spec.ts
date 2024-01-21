import { Customer } from '@app/entities/customer'
import { Address } from '@app/entities/customer/address'
import { InMemoryCustomersRepository } from 'src/test/dashboard/repositories/in-memory-customers-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { AddCustomerUseCase } from '.'

let inMemoryCustomersRepository: InMemoryCustomersRepository
let addCustomerUseCase: AddCustomerUseCase

beforeAll(() => {
  inMemoryCustomersRepository = new InMemoryCustomersRepository()
  addCustomerUseCase = new AddCustomerUseCase(inMemoryCustomersRepository)
})

describe('Add Customer Repository', () => {
  it('should be able to add a new customer', async () => {
    await addCustomerUseCase.execute({
      name: 'jhon doe',
      email: 'jhondoe@gmail.com',
      cpf: '000.000.000-00',
      ddd: 99,
      phone: 999999999,
      address: {
        city: 'são paulo',
        street: 'são paulo',
        state: 'SP',
        number: 34,
        postalCode: '00.000-00',
      },
    })

    expect(inMemoryCustomersRepository.customers).toHaveLength(1)
    expect(inMemoryCustomersRepository.customers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'jhon doe',
        }),
      ]),
    )
  })

  it('should not be able to add an customer that already exists', async () => {
    const customer = new Customer({
      name: 'henrique',
      email: 'henrique@gmail.com',
      cpf: '000.000.000-00',
      ddd: 99,
      phone: 999999999,
      address: new Address({
        city: 'são paulo',
        street: 'são paulo',
        state: 'SP',
        number: 34,
        postalCode: '00.000-00',
      }),
    })

    await inMemoryCustomersRepository.create(customer)

    await expect(
      addCustomerUseCase.execute({
        name: 'henrique',
        email: 'henrique@gmail.com',
        cpf: '111.111.111-11',
        ddd: 99,
        phone: 888888888,
        address: {
          city: 'são paulo',
          street: 'são paulo',
          state: 'SP',
          number: 35,
          postalCode: '11.111-11',
        },
      }),
    ).rejects.toThrow('Customer Already Exists!')
  })
})

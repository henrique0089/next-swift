import { beforeAll, describe, expect, it } from 'vitest'

import { Customer } from '@app/dashboard/entities/customer'
import { Address } from '@app/dashboard/entities/customer/address'
import { AppError } from '@app/dashboard/errors/app-error'
import { InMemoryCustomersRepository } from 'src/test/dashboard/repositories/in-memory-customers-repository'
import { RemoveCustomerUseCase } from '.'

let inMemoryCustomersRepository: InMemoryCustomersRepository
let removeCustomerUseCase: RemoveCustomerUseCase

beforeAll(() => {
  inMemoryCustomersRepository = new InMemoryCustomersRepository()
  removeCustomerUseCase = new RemoveCustomerUseCase(inMemoryCustomersRepository)
})

describe('Remove Customer UseCase', () => {
  it('should be able to remove a customer', async () => {
    const customer = new Customer({
      name: 'jhon doe',
      email: 'jhondoe@gmail.com',
      cpf: '000.000.000-00',
      ddd: 88,
      phone: 999999999,
      address: new Address({
        postalCode: '00000-000',
        street: 'brasil',
        number: 31,
        state: 'SP',
        city: 'são paulo',
      }),
      updatedAt: null,
    })

    await inMemoryCustomersRepository.create(customer)

    await removeCustomerUseCase.execute({ customerId: customer.id })

    expect(inMemoryCustomersRepository.customers).not.contains(customer)
  })

  it('should not be able to remove a customer that not exists', async () => {
    await expect(
      removeCustomerUseCase.execute({ customerId: 'fake-id' }),
    ).rejects.toEqual(new AppError('Customer not found!'))
  })
})

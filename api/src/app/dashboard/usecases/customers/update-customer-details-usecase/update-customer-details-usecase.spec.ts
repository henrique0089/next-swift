import { beforeAll, describe, expect, it } from 'vitest'

import { Customer } from '@app/dashboard/entities/customer'
import { Address } from '@app/dashboard/entities/customer/address'
import { InMemoryCustomersRepository } from 'src/test/dashboard/repositories/in-memory-customers-repository'
import { UpdateCustomerDetailsUseCase } from '.'

let inMemoryCustomersRepo: InMemoryCustomersRepository
let updateCustomerDetailsUseCase: UpdateCustomerDetailsUseCase

beforeAll(() => {
  inMemoryCustomersRepo = new InMemoryCustomersRepository()
  updateCustomerDetailsUseCase = new UpdateCustomerDetailsUseCase(
    inMemoryCustomersRepo,
  )
})

describe('UpdateCustomerDetailsUseCase', () => {
  it('should be able to update a customer', async () => {
    const customer = new Customer({
      name: 'jhon doe',
      email: 'jhondoe@gmail.com',
      ddd: 82,
      phone: 999999999,
      cpf: '931.147.680-32',
      address: new Address({
        postalCode: '00000-000',
        street: 'brasil',
        number: 31,
        state: 'SP',
        city: 'são paulo',
      }),
    })

    await inMemoryCustomersRepo.create(customer)

    await updateCustomerDetailsUseCase.execute({
      customerId: customer.id,
      name: 'jhon updated',
      email: 'jhonupdated@gmail.com',
    })

    expect(inMemoryCustomersRepo.customers[0].name).toEqual('jhon updated')
    expect(inMemoryCustomersRepo.customers[0].email).toEqual(
      'jhonupdated@gmail.com',
    )
  })

  it('should not be able to update a customer that not exists', async () => {
    await expect(
      updateCustomerDetailsUseCase.execute({ customerId: 'fake-id' }),
    ).rejects.toThrow('Customer not found!')
  })
})

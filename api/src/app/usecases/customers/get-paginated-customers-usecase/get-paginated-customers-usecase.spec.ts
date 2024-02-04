import { Customer } from '@app/entities/customer'
import { Address } from '@app/entities/customer/address'
import { InMemoryCustomersRepository } from 'src/test/dashboard/repositories/in-memory-customers-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { GetPaginatedCustomersUseCase } from '.'

let inMemoryCustomersRepository: InMemoryCustomersRepository
let getPaginatedCustomersUseCase: GetPaginatedCustomersUseCase

beforeAll(() => {
  inMemoryCustomersRepository = new InMemoryCustomersRepository()
  getPaginatedCustomersUseCase = new GetPaginatedCustomersUseCase(
    inMemoryCustomersRepository,
  )
})

describe('Get Paginated Customers UseCase', () => {
  it('should be able to get paginated customers', async () => {
    const customer = new Customer({
      name: 'jhon doe',
      email: 'jhondoe@gmail.com',
      cpf: '000.000.000-00',
      ddd: 88,
      phone: 999999999,
      address: new Address({
        city: 'são paulo',
        street: 'são paulo',
        state: 'SP',
        number: 34,
        postalCode: '00.000-00',
      }),
      updatedAt: null,
    })

    await inMemoryCustomersRepository.create(customer)

    const { customers } = await getPaginatedCustomersUseCase.execute({})

    expect(customers).toHaveLength(1)
    expect(customers[0].id).toEqual(customer.id)
  })
})

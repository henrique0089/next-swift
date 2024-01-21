import { Supplier } from '@app/entities/supplier'
import { InMemorySuppliersRepository } from 'src/test/dashboard/repositories/in-memory-suppliers-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { GetPaginatedSuppliersUseCase } from '.'

let inMemorySuppliersRepository: InMemorySuppliersRepository
let getPaginatedSuppliersUseCase: GetPaginatedSuppliersUseCase

beforeAll(() => {
  inMemorySuppliersRepository = new InMemorySuppliersRepository()
  getPaginatedSuppliersUseCase = new GetPaginatedSuppliersUseCase(
    inMemorySuppliersRepository,
  )
})

describe('Get Paginated Supplier UseCase', () => {
  it('should be able to get paginated suppliers', async () => {
    const supplier = new Supplier({
      name: 'jhon doe',
      email: 'jhondoe@gmail.com',
      cnpj: '000.000.000-00',
      ddd: 88,
      phone: 999999999,
      addresses: [],
      updatedAt: null,
    })

    await inMemorySuppliersRepository.create(supplier)

    const { suppliers } = await getPaginatedSuppliersUseCase.execute({})

    expect(suppliers).toHaveLength(1)
    expect(suppliers[0].id).toEqual(supplier.id)
  })
})

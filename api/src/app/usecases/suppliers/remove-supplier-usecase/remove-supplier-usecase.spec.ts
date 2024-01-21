import { beforeAll, describe, expect, it } from 'vitest'

import { Supplier } from '@app/entities/supplier'
import { Address } from '@app/entities/supplier/address'
import { AppError } from '@app/errors/app-error'
import { InMemorySuppliersRepository } from 'src/test/dashboard/repositories/in-memory-suppliers-repository'
import { RemoveSupplierUseCase } from '.'

let inMemorySuppliersRepository: InMemorySuppliersRepository
let removeSupplierUseCase: RemoveSupplierUseCase

beforeAll(() => {
  inMemorySuppliersRepository = new InMemorySuppliersRepository()
  removeSupplierUseCase = new RemoveSupplierUseCase(inMemorySuppliersRepository)
})

describe('Remove Supplier UseCase', () => {
  it('should be able to remove a supplier', async () => {
    const supplier = new Supplier({
      name: 'jhon doe',
      email: 'jhondoe@gmail.com',
      cnpj: '000.000.000-00',
      ddd: 88,
      phone: 999999999,
      addresses: [
        new Address({
          postalCode: '00000-000',
          street: 'brasil',
          number: 31,
          state: 'SP',
          city: 'são paulo',
        }),
      ],
      updatedAt: null,
    })

    await inMemorySuppliersRepository.create(supplier)

    await removeSupplierUseCase.execute({ supplierId: supplier.id })

    expect(inMemorySuppliersRepository.suppliers).not.contains(supplier)
  })

  it('should not be able to remove a supplier that not exists', async () => {
    await expect(
      removeSupplierUseCase.execute({ supplierId: 'fake-id' }),
    ).rejects.toEqual(new AppError('Supplier not found!'))
  })
})

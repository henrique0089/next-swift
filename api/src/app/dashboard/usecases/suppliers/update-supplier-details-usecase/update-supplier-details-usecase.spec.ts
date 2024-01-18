import { beforeAll, describe, expect, it } from 'vitest'

import { Supplier } from '@app/dashboard/entities/supplier'
import { Address } from '@app/dashboard/entities/supplier/address'
import { InMemorySuppliersRepository } from 'src/test/dashboard/repositories/in-memory-suppliers-repository'
import { UpdateSupplierDetailsUseCase } from '.'

let inMemorySuppliersRepo: InMemorySuppliersRepository
let updateSupplierDetailsUseCase: UpdateSupplierDetailsUseCase

beforeAll(() => {
  inMemorySuppliersRepo = new InMemorySuppliersRepository()
  updateSupplierDetailsUseCase = new UpdateSupplierDetailsUseCase(
    inMemorySuppliersRepo,
  )
})

describe('Update Supplier Details UseCase', () => {
  it('should be able to update a Supplier', async () => {
    const supplier = new Supplier({
      name: 'jhon doe',
      email: 'jhondoe@gmail.com',
      ddd: 82,
      phone: 999999999,
      cnpj: '931.147.680-32',
      addresses: [
        new Address({
          postalCode: '00000-000',
          street: 'brasil',
          number: 31,
          state: 'SP',
          city: 'são paulo',
        }),
      ],
    })

    await inMemorySuppliersRepo.create(supplier)

    await updateSupplierDetailsUseCase.execute({
      supplierId: supplier.id,
      name: 'jhon updated',
      email: 'jhonupdated@gmail.com',
    })

    expect(inMemorySuppliersRepo.suppliers[0].name).toEqual('jhon updated')
    expect(inMemorySuppliersRepo.suppliers[0].email).toEqual(
      'jhonupdated@gmail.com',
    )
  })

  it('should not be able to update a Supplier that not exists', async () => {
    await expect(
      updateSupplierDetailsUseCase.execute({ supplierId: 'fake-id' }),
    ).rejects.toThrow('Supplier not found!')
  })
})

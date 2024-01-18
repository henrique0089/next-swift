import { Supplier } from '@app/dashboard/entities/supplier'
import { Address } from '@app/dashboard/entities/supplier/address'
import { InMemorySuppliersRepository } from 'src/test/dashboard/repositories/in-memory-suppliers-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { AddSupplierUseCase } from '.'

let inMemorySuppliersRepository: InMemorySuppliersRepository
let addSupplierUseCase: AddSupplierUseCase

beforeAll(() => {
  inMemorySuppliersRepository = new InMemorySuppliersRepository()
  addSupplierUseCase = new AddSupplierUseCase(inMemorySuppliersRepository)
})

describe('Add Supplier Repository', () => {
  it('should be able to add a new Supplier', async () => {
    await addSupplierUseCase.execute({
      name: 'jhon doe',
      email: 'jhondoe@gmail.com',
      cnpj: '000.000.000-00',
      ddd: 99,
      phone: 999999999,
      addresses: [
        {
          city: 'são paulo',
          street: 'são paulo',
          state: 'SP',
          number: 34,
          postalCode: '00.000-00',
        },
      ],
    })

    expect(inMemorySuppliersRepository.suppliers).toHaveLength(1)
    expect(inMemorySuppliersRepository.suppliers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'jhon doe',
        }),
      ]),
    )
  })

  it('should not be able to add an Supplier that already exists', async () => {
    const supplier = new Supplier({
      name: 'henrique',
      email: 'henrique@gmail.com',
      cnpj: '000.000.000-00',
      ddd: 99,
      phone: 999999999,
      addresses: [
        new Address({
          city: 'são paulo',
          street: 'são paulo',
          state: 'SP',
          number: 34,
          postalCode: '00.000-00',
        }),
      ],
    })

    await inMemorySuppliersRepository.create(supplier)

    await expect(
      addSupplierUseCase.execute({
        name: 'henrique',
        email: 'henrique@gmail.com',
        cnpj: '111.111.111-11',
        ddd: 99,
        phone: 888888888,
        addresses: [
          {
            city: 'são paulo',
            street: 'são paulo',
            state: 'SP',
            number: 35,
            postalCode: '11.111-11',
          },
        ],
      }),
    ).rejects.toThrow('Supplier Already Exists!')
  })
})

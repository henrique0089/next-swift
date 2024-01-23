import { Customer } from '@app/entities/customer'
import { Address } from '@app/entities/customer/address'
import { Product } from '@app/entities/product'
import { PaymentMethod } from '@app/entities/sale'
import { NFEProvider } from '@app/providers/nfe-provider'
import { PDFKitNfeProvider } from '@infra/providers/nfe/pdfkit-nfe-provider'
import { InMemoryCustomersRepository } from 'src/test/dashboard/repositories/in-memory-customers-repository'
import { InMemoryProductsRepository } from 'src/test/dashboard/repositories/in-memory-products-repository'
import { InMemorySalesRepository } from 'src/test/dashboard/repositories/in-memory-sales-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { SaleProductUseCase } from '.'

let salesRepo: InMemorySalesRepository
let productsRepo: InMemoryProductsRepository
let customersRepo: InMemoryCustomersRepository
let nfeProvider: NFEProvider
let saleProductUseCase: SaleProductUseCase

beforeAll(() => {
  salesRepo = new InMemorySalesRepository()
  productsRepo = new InMemoryProductsRepository()
  customersRepo = new InMemoryCustomersRepository()
  nfeProvider = new PDFKitNfeProvider()
  saleProductUseCase = new SaleProductUseCase(
    salesRepo,
    productsRepo,
    customersRepo,
    nfeProvider,
  )
})

describe('Sale Product UseCase', () => {
  it('should be able to sale a product', async () => {
    const product = new Product({
      name: 't-shirt',
      description: 't-shirt description',
      width: 56,
      height: 78,
      price: 7990,
      quantity: 23,
      weight: 258,
      categories: [],
      images: [],
      updatedAt: null,
      removedAt: null,
    })

    await productsRepo.create(product)

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

    await customersRepo.create(customer)

    await saleProductUseCase.execute({
      productsQty: 2,
      productId: product.id,
      buyerId: customer.id,
      paymentMethod: PaymentMethod.debit,
    })

    expect(salesRepo.sales[0].quantity).toEqual(2)
    expect(salesRepo.sales[0].productId).toEqual(product.id)
    expect(salesRepo.sales[0].buyerId).toEqual(customer.id)
    expect(salesRepo.sales[0].paymentMethod).toEqual(PaymentMethod.debit)
  })

  it('should be able to receive an nfe buffer after sale a product', async () => {
    const product = new Product({
      name: 'shoes',
      description: 'shoes description',
      width: 56,
      height: 78,
      price: 7990,
      quantity: 23,
      weight: 258,
      categories: [],
      images: [],
      updatedAt: null,
      removedAt: null,
    })

    await productsRepo.create(product)

    const customer = new Customer({
      name: 'jhon doe 2',
      email: 'jhondoe2@gmail.com',
      ddd: 82,
      phone: 999999999,
      cpf: '831.147.680-32',
      address: new Address({
        postalCode: '11111-111',
        street: 'brasil',
        number: 31,
        state: 'SP',
        city: 'são paulo',
      }),
    })

    await customersRepo.create(customer)

    const { nfe } = await saleProductUseCase.execute({
      productsQty: 2,
      productId: product.id,
      buyerId: customer.id,
      paymentMethod: PaymentMethod.debit,
    })

    expect(nfe).instanceOf(Buffer)
  })

  it('should not be able to sale a product that not exists', async () => {
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

    await customersRepo.create(customer)

    await expect(
      saleProductUseCase.execute({
        productsQty: 2,
        productId: 'fake-product-id',
        buyerId: customer.id,
        paymentMethod: PaymentMethod.debit,
      }),
    ).rejects.toThrow('product not found!')
  })

  it('should not be able to sale a product if customer not exists', async () => {
    const product = new Product({
      name: 'shoes',
      description: 'shoes description',
      width: 56,
      height: 78,
      price: 7990,
      quantity: 23,
      weight: 258,
      categories: [],
      images: [],
      updatedAt: null,
      removedAt: null,
    })

    await productsRepo.create(product)

    await expect(
      saleProductUseCase.execute({
        productsQty: 2,
        productId: product.id,
        buyerId: 'fake-customer-id',
        paymentMethod: PaymentMethod.debit,
      }),
    ).rejects.toThrow('customer not found!')
  })

  it('should not be able to sale a product if quantity in stock is below or equal to 1', async () => {
    const product = new Product({
      name: 'shoes',
      description: 'shoes description',
      width: 56,
      height: 78,
      price: 7990,
      quantity: 1,
      weight: 258,
      categories: [],
      images: [],
      updatedAt: null,
      removedAt: null,
    })

    await productsRepo.create(product)

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

    await customersRepo.create(customer)

    await expect(
      saleProductUseCase.execute({
        productsQty: 2,
        productId: product.id,
        buyerId: customer.id,
        paymentMethod: PaymentMethod.debit,
      }),
    ).rejects.toThrow('product unavailable!')
  })
})

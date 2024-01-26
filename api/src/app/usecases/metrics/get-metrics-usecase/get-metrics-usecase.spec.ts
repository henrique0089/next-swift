import { Customer } from '@app/entities/customer'
import { Address } from '@app/entities/customer/address'
import { PaymentMethod, PaymentStatus, Sale } from '@app/entities/sale'
import dayjs from 'dayjs'
import { InMemoryCustomersRepository } from 'src/test/dashboard/repositories/in-memory-customers-repository'
import { InMemorySalesRepository } from 'src/test/dashboard/repositories/in-memory-sales-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { GetMetricsUseCase } from '.'

let inMemorySalesRepo: InMemorySalesRepository
let inMemoryCustomersRepo: InMemoryCustomersRepository
let getMetricsUseCase: GetMetricsUseCase

beforeAll(() => {
  inMemorySalesRepo = new InMemorySalesRepository()
  inMemoryCustomersRepo = new InMemoryCustomersRepository()
  getMetricsUseCase = new GetMetricsUseCase(
    inMemorySalesRepo,
    inMemoryCustomersRepo,
  )
})

describe('Get Metrics UseCase', () => {
  it('should be able get metrics', async () => {
    const customer01 = new Customer({
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
      createdAt: dayjs().subtract(1, 'month').toDate(),
    })

    const sale01Total = 8000 * 2
    const sale01 = new Sale({
      total: sale01Total,
      status: PaymentStatus.PAID,
      paymentMethod: PaymentMethod.credit,
      productId: 'product-id-2',
      buyerId: customer01.id,
      buyerName: customer01.name,
      productName: 't-shirt',
      productPrice: 8000,
      productQty: 2,
      createdAt: dayjs().subtract(1, 'month').toDate(),
    })

    const customer02 = new Customer({
      name: 'jhondoe',
      email: 'jhondoe@gmail.com',
      cpf: '111.111.111-11',
      ddd: 88,
      phone: 888888888,
      address: new Address({
        city: 'são paulo',
        street: 'são paulo',
        state: 'SP',
        number: 34,
        postalCode: '22.222-22',
      }),
    })

    const sale02Total = 7500 * 2
    const sale02 = new Sale({
      total: sale02Total,
      status: PaymentStatus.PAID,
      paymentMethod: PaymentMethod.debit,
      productId: 'product-id',
      buyerId: customer02.id,
      buyerName: customer02.name,
      productName: 'shoes',
      productPrice: 7500,
      productQty: 2,
    })

    await inMemorySalesRepo.create(sale01)
    await inMemorySalesRepo.create(sale02)
    await inMemoryCustomersRepo.create(customer01)
    await inMemoryCustomersRepo.create(customer02)

    const { metrics } = await getMetricsUseCase.execute()

    expect(metrics.salesCurrentMonthTotal).toBeDefined()
    expect(metrics.salesCurrentMonthTotal).toEqual(sale02Total / 100)
  })
})

import { PaymentMethod, PaymentStatus, Sale } from '@app/entities/sale'
import dayjs from 'dayjs'
import { InMemorySalesRepository } from 'src/test/dashboard/repositories/in-memory-sales-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { GetPaginatedSalesUseCase } from '.'

let inMemorySalesRepo: InMemorySalesRepository
let getPaginatedSalesUseCase: GetPaginatedSalesUseCase

beforeAll(() => {
  inMemorySalesRepo = new InMemorySalesRepository()
  getPaginatedSalesUseCase = new GetPaginatedSalesUseCase(inMemorySalesRepo)
})

describe('Get Paginated Sales UseCase', () => {
  it('should be able to get paginated sales', async () => {
    const sale01CreatedAt = dayjs().subtract(1, 'month').toDate()
    const sale02CreatedAt = new Date()
    const sale01 = new Sale({
      total: 7500 * 2,
      status: PaymentStatus.PAID,
      paymentMethod: PaymentMethod.debit,
      productId: `product-id`,
      buyerId: `buyer-id`,
      buyerName: `jhon doe`,
      productName: `shoes`,
      productPrice: 7500,
      productQty: 2,
      createdAt: sale01CreatedAt,
    })

    const sale02 = new Sale({
      total: 7500 * 3,
      status: PaymentStatus.PAID,
      paymentMethod: PaymentMethod.debit,
      productId: `product-id`,
      buyerId: `buyer-id`,
      buyerName: `henrique monteiro`,
      productName: `shoes`,
      productPrice: 7500,
      productQty: 3,
      createdAt: sale02CreatedAt,
    })

    await inMemorySalesRepo.create(sale01)
    await inMemorySalesRepo.create(sale02)

    const { sales } = await getPaginatedSalesUseCase.execute({
      startDate: sale01CreatedAt,
      endDate: sale02CreatedAt,
    })

    expect(sales).toHaveLength(2)
    expect(sales).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          buyerName: `jhon doe`,
        }),
        expect.objectContaining({
          buyerName: `henrique monteiro`,
        }),
      ]),
    )
  })
})

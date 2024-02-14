import { PaymentMethod, PaymentStatus, Sale } from '@app/entities/sale'
import { InMemorySalesRepository } from 'src/test/dashboard/repositories/in-memory-sales-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { GetRecentSalesUseCase } from '.'

let inMemorySalesRepository: InMemorySalesRepository
let sut: GetRecentSalesUseCase

beforeAll(() => {
  inMemorySalesRepository = new InMemorySalesRepository()
  sut = new GetRecentSalesUseCase(inMemorySalesRepository)
})

describe('Get Last Six Sales UseCase', () => {
  it('should be able to get last 6 sales', async () => {
    inMemorySalesRepository.sales = []

    for (let i = 1; i <= 10; i++) {
      const sale = new Sale({
        total: 7500 * i,
        status: PaymentStatus.PAID,
        paymentMethod: PaymentMethod.debit,
        productId: `product-${i}`,
        buyerId: `buyer-${i}`,
        buyerName: `buyer name`,
        productName: `shoes-${i}`,
        productPrice: 7500,
        productQty: i,
      })

      await inMemorySalesRepository.create(sale)
    }

    const { sales } = await sut.execute()

    expect(sales).toHaveLength(6)
    expect(sales[5].productId).toEqual('product-5')
  })
})

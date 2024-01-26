import { PaymentMethod, PaymentStatus, Sale } from '@app/entities/sale'
import dayjs from 'dayjs'
import { InMemorySalesRepository } from 'src/test/dashboard/repositories/in-memory-sales-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { GetRevenueInPeriodMetricsUseCase } from '.'

let inMemorySalesRepository: InMemorySalesRepository
let getRevenueInPeriodMetricsUseCase: GetRevenueInPeriodMetricsUseCase

beforeAll(() => {
  inMemorySalesRepository = new InMemorySalesRepository()
  getRevenueInPeriodMetricsUseCase = new GetRevenueInPeriodMetricsUseCase(
    inMemorySalesRepository,
  )
})

describe('Get Revenue In Period Metrics UseCase', () => {
  it('should be able to get revenue metrics', async () => {
    const createdAt = dayjs().subtract(1, 'month').toDate()
    const sale = new Sale({
      total: 7500 * 3,
      status: PaymentStatus.PENDING,
      paymentMethod: PaymentMethod.debit,
      productId: `product-1`,
      buyerId: `buyer-1`,
      buyerName: `jhon doe`,
      productName: `shoes-1`,
      productPrice: 7500,
      productQty: 3,
      createdAt,
    })

    await inMemorySalesRepository.create(sale)

    const startDate = dayjs().subtract(1, 'month').startOf('month').toDate()
    const endDate = new Date()

    const { metrics } = await getRevenueInPeriodMetricsUseCase.execute({
      startDate,
      endDate,
    })

    expect(metrics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          date: dayjs(createdAt).format('DD/MM'),
          revenue: 7500 * 3,
        }),
      ]),
    )
  })
})

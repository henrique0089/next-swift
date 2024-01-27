import fs from 'node:fs'
import { beforeAll, describe, expect, it } from 'vitest'

import { PaymentMethod, PaymentStatus, Sale } from '@app/entities/sale'
import { ExceljsSalesReportProvider } from '@infra/providers/report/exceljs-sales-excel-report-provider'
import dayjs from 'dayjs'
import { InMemorySalesRepository } from 'src/test/dashboard/repositories/in-memory-sales-repository'
import { GenerateRevenueReportUseCase } from '.'

let inMemorySalesRepo: InMemorySalesRepository
let salesReportProvider: ExceljsSalesReportProvider
let generateRevenueReportUseCase: GenerateRevenueReportUseCase

beforeAll(() => {
  inMemorySalesRepo = new InMemorySalesRepository()
  salesReportProvider = new ExceljsSalesReportProvider()
  generateRevenueReportUseCase = new GenerateRevenueReportUseCase(
    inMemorySalesRepo,
    salesReportProvider,
  )
})

describe('Generate Revenue Report UseCase', () => {
  it('should be able to generate report', async () => {
    const createdAt = dayjs().subtract(1, 'month').toDate()
    const sale01 = new Sale({
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

    const sale02 = new Sale({
      total: 7500 * 3,
      status: PaymentStatus.PENDING,
      paymentMethod: PaymentMethod.debit,
      productId: `product-1`,
      buyerId: `buyer-1`,
      buyerName: `jhon doe`,
      productName: `shoes-1`,
      productPrice: 7500,
      productQty: 3,
    })

    await inMemorySalesRepo.create(sale01)
    await inMemorySalesRepo.create(sale02)

    const startDate = dayjs().subtract(1, 'month').startOf('month').toDate()
    const endDate = new Date()

    const { filename, fullFilePath } =
      await generateRevenueReportUseCase.execute({ startDate, endDate })

    expect(filename).toBeTruthy()
    expect(fullFilePath).toBeTruthy()

    await fs.promises.unlink(fullFilePath)
  })
})

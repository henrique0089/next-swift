import dayjs from 'dayjs'
import { randomUUID } from 'node:crypto'
import { beforeAll, describe, expect, it } from 'vitest'

import { PaymentMethod, Sale } from '@app/entities/sale'
import { ExceljsSalesReportProvider } from '@infra/providers/report/exceljs-sales-excel-report-provider'
import { PDFKitSalesReportProvider } from '@infra/providers/report/pdfkit-sales-report-provider'
import { InMemorySalesRepository } from 'src/test/dashboard/repositories/in-memory-sales-repository'
import { GeneratePDFReportUseCase } from '.'

let inMemorySalesRepo: InMemorySalesRepository
let salesReportProvider: ExceljsSalesReportProvider
let generatePDFReportUseCase: GeneratePDFReportUseCase

beforeAll(() => {
  inMemorySalesRepo = new InMemorySalesRepository()
  salesReportProvider = new PDFKitSalesReportProvider()
  generatePDFReportUseCase = new GeneratePDFReportUseCase(
    inMemorySalesRepo,
    salesReportProvider,
  )
})

describe('Generate PDF Report UseCase', () => {
  it('should be able to generate pdf report', async () => {
    const productId = randomUUID()
    const productName = 'shoes'
    const productPrice = 12550
    const productQty = 3

    const buyerId = randomUUID()

    const sale = new Sale({
      total: productPrice * productQty,
      paymentMethod: PaymentMethod.credit,
      buyerId,
      productId,
      productName,
      productPrice,
      productQty,
      createdAt: dayjs(new Date()).subtract(5, 'hour').toDate(),
    })

    await inMemorySalesRepo.create(sale)

    const startDate = dayjs(new Date())
      .subtract(1, 'day')
      .startOf('day')
      .toDate()
    const endDate = dayjs(new Date()).endOf('day').toDate()

    const { report } = await generatePDFReportUseCase.execute({
      startDate,
      endDate,
    })

    expect(report).toBeDefined()
    expect(report).instanceOf(Buffer)
  })

  it('should not be able to generate pdf report if sales length equals to 0', async () => {
    inMemorySalesRepo.sales = []

    const startDate = dayjs(new Date())
      .subtract(1, 'day')
      .startOf('day')
      .toDate()
    const endDate = dayjs(new Date()).endOf('day').toDate()

    await expect(
      generatePDFReportUseCase.execute({ startDate, endDate }),
    ).rejects.toThrow('report generation is not possible. not enough sales!')
  })
})

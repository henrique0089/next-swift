import { PaymentMethod, Sale } from '@app/entities/sale'
import { ExceljsSalesReportProvider } from '@infra/providers/report/exceljs-sales-excel-report-provider'
import { randomUUID } from 'crypto'
import dayjs from 'dayjs'
import { InMemorySalesRepository } from 'src/test/dashboard/repositories/in-memory-sales-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { GenerateExcelReportUseCase } from '.'

let inMemorySalesRepo: InMemorySalesRepository
let salesReportProvider: ExceljsSalesReportProvider
let generateExcelReportUseCase: GenerateExcelReportUseCase

beforeAll(() => {
  inMemorySalesRepo = new InMemorySalesRepository()
  salesReportProvider = new ExceljsSalesReportProvider()
  generateExcelReportUseCase = new GenerateExcelReportUseCase(
    inMemorySalesRepo,
    salesReportProvider,
  )
})

describe('Generate Excel Report UseCase', () => {
  it('should be able to generate excel report', async () => {
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

    const { filename, fullFilePath } = await generateExcelReportUseCase.execute(
      { startDate, endDate },
    )

    expect(filename).toBeDefined()
    expect(fullFilePath).toBeDefined()
  })

  it('should not be able to generate excel report if sales length equals to 0', async () => {
    inMemorySalesRepo.sales = []

    const startDate = dayjs(new Date())
      .subtract(1, 'day')
      .startOf('day')
      .toDate()
    const endDate = dayjs(new Date()).endOf('day').toDate()

    await expect(
      generateExcelReportUseCase.execute({ startDate, endDate }),
    ).rejects.toThrow('report generation is not possible. not enough sales!')
  })
})

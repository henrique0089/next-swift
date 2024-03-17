import { AppError } from '@app/errors/app-error'
import { ExcelSalesReportProvider } from '@app/providers/excel-sales-report-provider'
import { SalesRepository } from '@app/repositories/sales-repository'

interface Request {
  startDate?: Date
  endDate?: Date
}

interface Response {
  filename: string
  buff: Buffer
}

export class GenerateRevenueReportUseCase {
  constructor(
    private salesRepo: SalesRepository,
    private excelSalesReportProvider: ExcelSalesReportProvider,
  ) {}

  async execute({ startDate, endDate }: Request): Promise<Response> {
    const sales = await this.salesRepo.getRevenueMetrics({
      startDate,
      endDate,
    })

    if (sales.length === 0) {
      throw new AppError('report generation is not possible. not enough sales!')
    }

    const { filename, buff } =
      await this.excelSalesReportProvider.generateRevenue(sales)

    return { filename, buff }
  }
}

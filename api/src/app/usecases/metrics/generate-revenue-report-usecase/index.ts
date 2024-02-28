import { AppError } from '@app/errors/app-error'
import { ExcelSalesReportProvider } from '@app/providers/excel-sales-report-provider'
import { SalesRepository } from '@app/repositories/sales-repository'

interface Request {
  startDate?: Date
  endDate?: Date
}

export class GenerateRevenueReportUseCase {
  constructor(
    private salesRepo: SalesRepository,
    private excelSalesReportProvider: ExcelSalesReportProvider,
  ) {}

  async execute({ startDate, endDate }: Request) {
    const sales = await this.salesRepo.getRevenueMetrics({
      startDate,
      endDate,
    })

    if (sales.length === 0) {
      throw new AppError('report generation is not possible. not enough sales!')
    }

    console.log(sales)

    const { filename, fullFilePath } =
      await this.excelSalesReportProvider.generateRevenue(sales)

    return { filename, fullFilePath }
  }
}

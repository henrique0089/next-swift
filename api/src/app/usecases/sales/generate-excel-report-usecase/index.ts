import { AppError } from '@app/errors/app-error'
import { ExcelSalesReportProvider } from '@app/providers/excel-sales-report-provider'
import { SalesRepository } from '@app/repositories/sales-repository'

interface Request {
  startDate: Date
  endDate: Date
  page?: number
  limit?: number
}

interface Response {
  filename: string
  buff: Buffer
}

export class GenerateExcelReportUseCase {
  constructor(
    private salesRepo: SalesRepository,
    private excelSalesReportProvider: ExcelSalesReportProvider,
  ) {}

  async execute({
    startDate,
    endDate,
    page = 1,
    limit = 10,
  }: Request): Promise<Response> {
    const sales = await this.salesRepo.paginate({
      startDate,
      endDate,
      page,
      limit,
    })

    if (sales.length === 0) {
      throw new AppError('report generation is not possible. not enough sales!')
    }

    const { filename, buff } =
      await this.excelSalesReportProvider.generate(sales)

    return { filename, buff }
  }
}

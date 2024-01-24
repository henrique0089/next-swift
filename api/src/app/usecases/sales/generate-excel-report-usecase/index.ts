import { AppError } from '@app/errors/app-error'
import { SalesReportProvider } from '@app/providers/sales-report-provider'
import { SalesRepository } from '@app/repositories/sales-repository'

interface Request {
  startDate: Date
  endDate: Date
  page?: number
  limit?: number
}

interface Response {
  filename: string
  fullFilePath: string
}

export class GenerateExcelReportUseCase {
  constructor(
    private salesRepo: SalesRepository,
    private salesReportProvider: SalesReportProvider,
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

    const { filename, fullFilePath } =
      await this.salesReportProvider.generateExcel(sales)

    return { filename, fullFilePath }
  }
}

import { AppError } from '@app/errors/app-error'
import { PDFSalesReportProvider } from '@app/providers/pdf-sales-report-provider'
import { SalesRepository } from '@app/repositories/sales-repository'

interface Request {
  startDate: Date
  endDate: Date
  page?: number
  limit?: number
}

interface Response {
  report: Buffer
}

export class GeneratePDFReportUseCase {
  constructor(
    private salesRepo: SalesRepository,
    private pdfSalesReportProvider: PDFSalesReportProvider,
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

    const report = await this.pdfSalesReportProvider.generate(sales)

    return { report }
  }
}

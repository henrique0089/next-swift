import { GenerateRevenueReportUseCase } from '@app/usecases/metrics/generate-revenue-report-usecase'
import { PGSalesRepository } from '@infra/database/pg/repositories/pg-sales-repository'
import { ExceljsSalesReportProvider } from '@infra/providers/report/exceljs-sales-excel-report-provider'
import { Request, Response } from 'express'
import { z } from 'zod'

const querySchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
})

export class GenerateRevenueReportController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { startDate, endDate } = querySchema.parse(req.query)

    const salesRepo = new PGSalesRepository()
    const salesReportProvider = new ExceljsSalesReportProvider()
    const generateExcelReportUseCase = new GenerateRevenueReportUseCase(
      salesRepo,
      salesReportProvider,
    )

    const { filename, buff } = await generateExcelReportUseCase.execute({
      startDate,
      endDate,
    })

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`)

    res.setHeader('Access-Control-Expose-Headers', 'x-filename')
    res.setHeader('x-filename', filename)

    return res.send(buff)
  }
}

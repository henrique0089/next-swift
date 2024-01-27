import fs from 'node:fs'

import { GenerateRevenueReportUseCase } from '@app/usecases/metrics/generate-revenue-report-usecase'
import { PGSalesRepository } from '@infra/database/pg/repositories/pg-sales-repository'
import { ExceljsSalesReportProvider } from '@infra/providers/report/exceljs-sales-excel-report-provider'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const querySchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
})

export class GenerateRevenueReportController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const { startDate, endDate } = querySchema.parse(req.query)

    const salesRepo = new PGSalesRepository()
    const salesReportProvider = new ExceljsSalesReportProvider()
    const generateExcelReportUseCase = new GenerateRevenueReportUseCase(
      salesRepo,
      salesReportProvider,
    )

    const { filename, fullFilePath } = await generateExcelReportUseCase.execute(
      {
        startDate,
        endDate,
      },
    )

    rep.header(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )
    rep.header('Content-Disposition', `${filename}`)

    const fileContent = fs.readFileSync(fullFilePath)

    rep.send(fileContent)

    await fs.promises.unlink(fullFilePath)
  }
}

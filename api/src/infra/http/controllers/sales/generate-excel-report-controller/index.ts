import fs from 'node:fs'

import { GenerateExcelReportUseCase } from '@app/usecases/sales/generate-excel-report-usecase'
import { PGSalesRepository } from '@infra/database/pg/repositories/pg-sales-repository'
import { ExceljsSalesReportProvider } from '@infra/providers/report/exceljs-sales-excel-report-provider'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const querySchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
})

export class GenerateExcelReportController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const {
      startDate,
      endDate,
      limit = 10,
      page = 1,
    } = querySchema.parse(req.query)

    const salesRepo = new PGSalesRepository()
    const salesReportProvider = new ExceljsSalesReportProvider()
    const generateExcelReportUseCase = new GenerateExcelReportUseCase(
      salesRepo,
      salesReportProvider,
    )

    const { filename, fullFilePath } = await generateExcelReportUseCase.execute(
      {
        startDate,
        endDate,
        limit,
        page,
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

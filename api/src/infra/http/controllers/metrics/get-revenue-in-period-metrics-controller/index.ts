import { GetRevenueInPeriodMetricsUseCase } from '@app/usecases/metrics/get-revenue-in-period-metrics-usecase'
import { PGSalesRepository } from '@infra/database/pg/repositories/pg-sales-repository'
import { Request, Response } from 'express'
import { z } from 'zod'

const querySchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
})

export class GetRevenueInPeriodMetricsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { startDate, endDate } = querySchema.parse(req.query)

    const salesRepo = new PGSalesRepository()
    const getRevenueInPeriodMetricsUseCase =
      new GetRevenueInPeriodMetricsUseCase(salesRepo)

    const { metrics } = await getRevenueInPeriodMetricsUseCase.execute({
      startDate,
      endDate,
    })

    return res.send({ revenueMetrics: metrics })
  }
}

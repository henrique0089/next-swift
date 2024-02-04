import { GetMetricsUseCase } from '@app/usecases/metrics/get-metrics-usecase'
import { PGCustomersRepository } from '@infra/database/pg/repositories/pg-customers-repository'
import { PGSalesRepository } from '@infra/database/pg/repositories/pg-sales-repository'
import { Request, Response } from 'express'

export class GetMetricsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const salesRepo = new PGSalesRepository()
    const customersRepo = new PGCustomersRepository()
    const getMetricsUseCase = new GetMetricsUseCase(salesRepo, customersRepo)

    const { metrics } = await getMetricsUseCase.execute()

    return res.json({ metrics })
  }
}

import { GetMetricsUseCase } from '@app/usecases/metrics/get-metrics-usecase'
import { PGCustomersRepository } from '@infra/database/pg/repositories/pg-customers-repository'
import { PGSalesRepository } from '@infra/database/pg/repositories/pg-sales-repository'
import { FastifyReply, FastifyRequest } from 'fastify'

export class GetMetricsController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<FastifyReply> {
    const salesRepo = new PGSalesRepository()
    const customersRepo = new PGCustomersRepository()
    const getMetricsUseCase = new GetMetricsUseCase(salesRepo, customersRepo)

    const { metrics } = await getMetricsUseCase.execute()

    return rep.send({ metrics })
  }
}

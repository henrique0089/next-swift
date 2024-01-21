import { GetPaginatedCustomersUseCase } from '@app/usecases/customers/get-paginated-customers-usecase'
import { PGCustomersRepository } from '@infra/database/pg/repositories/pg-customers-repository'
import { CustomerViewModel } from '@infra/http/view-models/customer-view-model'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const querySchema = z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
})

export class GetPaginatedCustomersController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<FastifyReply> {
    const { page, limit } = querySchema.parse(req.query)

    const customersRepo = new PGCustomersRepository()
    const getPaginatedCustomersUseCase = new GetPaginatedCustomersUseCase(
      customersRepo,
    )

    const result = await getPaginatedCustomersUseCase.execute({
      page,
      limit,
    })

    const customers = result.customers.map(CustomerViewModel.toHttp)

    return rep.send({ customers })
  }
}

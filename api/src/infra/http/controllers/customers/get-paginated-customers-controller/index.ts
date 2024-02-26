import { GetPaginatedCustomersUseCase } from '@app/usecases/customers/get-paginated-customers-usecase'
import { PGCustomersRepository } from '@infra/database/pg/repositories/pg-customers-repository'
import { CustomerViewModel } from '@infra/http/view-models/customer-view-model'
import { Request, Response } from 'express'
import { z } from 'zod'

const querySchema = z.object({
  customer: z.string().optional(),
  email: z.string().optional(),
  document: z.string().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
})

export class GetPaginatedCustomersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { customer, email, document, startDate, endDate, page, limit } =
      querySchema.parse(req.query)

    const customersRepo = new PGCustomersRepository()
    const getPaginatedCustomersUseCase = new GetPaginatedCustomersUseCase(
      customersRepo,
    )

    const result = await getPaginatedCustomersUseCase.execute({
      customer,
      email,
      document,
      startDate,
      endDate,
      page,
      limit,
    })

    const customers = result.customers.map(CustomerViewModel.toHttp)

    return res.json({ customers, totalCount: result.totalCount })
  }
}

import { PaymentMethod, PaymentStatus } from '@app/entities/sale'
import { GetPaginatedSalesUseCase } from '@app/usecases/sales/get-paginated-sales-usecase'
import { PGSalesRepository } from '@infra/database/pg/repositories/pg-sales-repository'
import { SaleViewModel } from '@infra/http/view-models/sale-view-model'
import { Request, Response } from 'express'
import { z } from 'zod'

const querySchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  search: z.string().optional(),
  paymentMethod: z.enum(['MONEY', 'CREDIT', 'DEBIT']).optional(),
  status: z.enum(['PENDING', 'PAID', 'CANCELED']).optional(),
  limit: z.coerce.number().optional(),
  page: z.coerce.number().optional(),
})

export class GetPaginatedSalesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { startDate, endDate, search, paymentMethod, status, limit, page } =
      querySchema.parse(req.query)

    const salesRepo = new PGSalesRepository()
    const getPaginatedSalesUseCase = new GetPaginatedSalesUseCase(salesRepo)

    const result = await getPaginatedSalesUseCase.execute({
      startDate,
      endDate,
      search,
      paymentMethod: paymentMethod as PaymentMethod,
      status: status as PaymentStatus,
      limit,
      page,
    })

    const sales = result.sales.map(SaleViewModel.toHttp)

    return res.json({ sales })
  }
}

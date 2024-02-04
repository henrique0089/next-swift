import { GetPaginatedSuppliersUseCase } from '@app/usecases/suppliers/get-paginated-suppliers-usecase'
import { PGSuppliersRepository } from '@infra/database/pg/repositories/pg-suppliers-repository'
import { SupplierViewModel } from '@infra/http/view-models/supplier-view-model'
import { Request, Response } from 'express'
import { z } from 'zod'

const querySchema = z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
})

export class GetPaginatedSuppliersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { page, limit } = querySchema.parse(req.query)

    const supplierssRepo = new PGSuppliersRepository()
    const getPaginatedSuppliersUseCase = new GetPaginatedSuppliersUseCase(
      supplierssRepo,
    )

    const result = await getPaginatedSuppliersUseCase.execute({
      page,
      limit,
    })

    const suppliers = result.suppliers.map(SupplierViewModel.toHttp)

    return res.send({ suppliers })
  }
}

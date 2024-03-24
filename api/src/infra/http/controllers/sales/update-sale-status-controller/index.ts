import { PaymentStatus } from '@app/entities/sale'
import { UpdateSaleStatusUseCase } from '@app/usecases/sales/update-sale-status-usecase'
import { PGSalesRepository } from '@infra/database/pg/repositories/pg-sales-repository'
import { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
  saleId: z.string().uuid(),
})

const bodySchema = z.object({
  status: z.enum(['PAID', 'PENDING', 'CANCELED']),
})

export class UpdateSaleStatusController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { saleId } = paramsSchema.parse(req.params)
    const { status } = bodySchema.parse(req.body)

    const salesRepo = new PGSalesRepository()
    const updateSaleStatusUseCase = new UpdateSaleStatusUseCase(salesRepo)

    await updateSaleStatusUseCase.execute({
      saleId,
      status: status as PaymentStatus,
    })

    return res.status(204).send()
  }
}

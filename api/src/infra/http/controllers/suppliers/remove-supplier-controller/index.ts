import { RemoveSupplierUseCase } from '@app/usecases/suppliers/remove-supplier-usecase'
import { PGSuppliersRepository } from '@infra/database/pg/repositories/pg-suppliers-repository'
import { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
  supplierId: z.string(),
})

export class RemoveSupplierController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { supplierId } = paramsSchema.parse(req.params)

    const suppliersRepo = new PGSuppliersRepository()
    const removeSupplierUseCase = new RemoveSupplierUseCase(suppliersRepo)

    await removeSupplierUseCase.execute({ supplierId })

    return res.status(204).send()
  }
}

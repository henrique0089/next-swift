import { UpdateSupplierDetailsUseCase } from '@app/usecases/suppliers/update-supplier-details-usecase'
import { PGSuppliersRepository } from '@infra/database/pg/repositories/pg-suppliers-repository'
import { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
  supplierId: z.string().uuid(),
})

const bodySchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  ddd: z.number().optional(),
  phone: z.number().optional(),
  postalCode: z.string().optional(),
  street: z.string().optional(),
  number: z.number().optional(),
  complement: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
})

export class UpdateSupplierDetailsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { supplierId } = paramsSchema.parse(req.params)
    const data = bodySchema.parse(req.body)

    const suppliersRepo = new PGSuppliersRepository()
    const updateSupplierDetailsUseCase = new UpdateSupplierDetailsUseCase(
      suppliersRepo,
    )

    await updateSupplierDetailsUseCase.execute({
      supplierId,
      ...data,
    })

    return res.status(204).send()
  }
}

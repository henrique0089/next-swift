import { RemoveSupplierUseCase } from '@app/usecases/suppliers/remove-supplier-usecase'
import { PGSuppliersRepository } from '@infra/database/pg/repositories/pg-suppliers-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const paramsSchema = z.object({
  supplierId: z.string(),
})

export class RemoveSupplierController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<FastifyReply> {
    const { supplierId } = paramsSchema.parse(req.params)

    const suppliersRepo = new PGSuppliersRepository()
    const removeSupplierUseCase = new RemoveSupplierUseCase(suppliersRepo)

    await removeSupplierUseCase.execute({ supplierId })

    return rep.status(204).send()
  }
}

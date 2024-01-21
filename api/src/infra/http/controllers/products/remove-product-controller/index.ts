import { RemoveProductUseCase } from '@app/usecases/products/remove-product-usecase'
import { PGProductsRepository } from '@infra/database/pg/repositories/pg-products-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const paramsSchema = z.object({
  productId: z.string().uuid(),
})

export class RemoveProductController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<FastifyReply> {
    const { productId } = paramsSchema.parse(req.params)

    const productsRepo = new PGProductsRepository()
    const removeProductUseCase = new RemoveProductUseCase(productsRepo)

    await removeProductUseCase.execute({ productId })

    return rep.status(204).send()
  }
}

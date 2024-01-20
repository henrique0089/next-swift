import { UpdateProductDetailsUseCase } from '@app/dashboard/usecases/products/update-product-details-usecase'
import { PGProductsRepository } from '@infra/database/pg/dashboard/repositories/pg-products-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const paramsSchema = z.object({
  productId: z.string().uuid(),
})

const bodySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  quantity: z.number().optional(),
  price: z.number().optional(),
  weight: z.number().optional(),
})

export class UpdateProductDetailsController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<FastifyReply> {
    const { productId } = paramsSchema.parse(req.params)
    const data = bodySchema.parse(req.body)

    const productsRepo = new PGProductsRepository()
    const updateProductDetailsUseCase = new UpdateProductDetailsUseCase(
      productsRepo,
    )

    await updateProductDetailsUseCase.execute({ productId, ...data })

    return rep.status(204).send()
  }
}

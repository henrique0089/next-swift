import { RemoveProductImagesUseCase } from '@app/usecases/products/remove-product-images-usecase'
import { PGProductImagesRepository } from '@infra/database/pg/repositories/pg-product-images-repository'
import { PGProductsRepository } from '@infra/database/pg/repositories/pg-products-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const paramsSchema = z.object({
  productId: z.string().uuid(),
})

const bodySchema = z.object({
  imagesIds: z.string().uuid().array(),
})

export class RemoveProductImagesController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<FastifyReply> {
    const { productId } = paramsSchema.parse(req.params)
    const { imagesIds } = bodySchema.parse(req.body)

    const productsRepo = new PGProductsRepository()
    const productImagesRepo = new PGProductImagesRepository()
    const removeProductImagesUseCase = new RemoveProductImagesUseCase(
      productsRepo,
      productImagesRepo,
    )

    await removeProductImagesUseCase.execute({ productId, imagesIds })

    return rep.status(204).send()
  }
}

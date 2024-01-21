import { AddCategoyToProductUseCase } from '@app/usecases/products/add-categories-to-product-usecase'
import { PGCategoriesRepository } from '@infra/database/pg/repositories/pg-categories-repository'
import { PGProductsRepository } from '@infra/database/pg/repositories/pg-products-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const paramsSchema = z.object({
  productId: z.string().nonempty(),
})

const bodySchema = z.object({
  categoriesIds: z.string().uuid().array(),
})

export class AddCategoriesToProductController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<FastifyReply> {
    const { productId } = paramsSchema.parse(req.params)
    const { categoriesIds } = bodySchema.parse(req.body)

    const productsRepo = new PGProductsRepository()
    const categoriesRepo = new PGCategoriesRepository()
    const addCategoyToProductUseCase = new AddCategoyToProductUseCase(
      productsRepo,
      categoriesRepo,
    )

    await addCategoyToProductUseCase.execute({
      productId,
      categoriesIds,
    })

    return rep.status(201).send()
  }
}

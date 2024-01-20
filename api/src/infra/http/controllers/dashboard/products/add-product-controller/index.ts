import { AddProductUseCase } from '@app/dashboard/usecases/products/add-product-usecase'
import { PGCategoriesRepository } from '@infra/database/pg/dashboard/repositories/pg-categories-repository'
import { PGProductsRepository } from '@infra/database/pg/dashboard/repositories/pg-products-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const bodySchema = z.object({
  name: z.string(),
  description: z.string(),
  width: z.number(),
  height: z.number(),
  quantity: z.number(),
  price: z.number(),
  weight: z.number(),
  categories: z.string().array(),
  images: z.string().array(),
})

export class AddProductController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<FastifyReply> {
    const {
      name,
      description,
      width,
      height,
      weight,
      price,
      quantity,
      categories,
      images,
    } = bodySchema.parse(req.body)

    const productsRepo = new PGProductsRepository()
    const categoriesRepo = new PGCategoriesRepository()
    const addProductUseCase = new AddProductUseCase(
      productsRepo,
      categoriesRepo,
    )

    await addProductUseCase.execute({
      name,
      description,
      width,
      height,
      weight,
      price,
      quantity,
      categories,
      images,
    })

    return rep.status(201).send()
  }
}

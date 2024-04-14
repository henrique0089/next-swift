import { AddCategoyToProductUseCase } from '@app/usecases/products/add-categories-to-product-usecase'
import { PGCategoriesRepository } from '@infra/database/pg/repositories/pg-categories-repository'
import { PGProductsRepository } from '@infra/database/pg/repositories/pg-products-repository'
import { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
  productId: z.string(),
})

const bodySchema = z.object({
  categoriesIds: z
    .string()
    .uuid()
    .array()
    .min(1, { message: 'Select at least 1 category.' }),
})

export class AddCategoriesToProductController {
  async handle(req: Request, res: Response): Promise<Response> {
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

    return res.status(201).send()
  }
}

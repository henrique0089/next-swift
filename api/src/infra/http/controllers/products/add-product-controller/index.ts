import { AddProductUseCase } from '@app/usecases/products/add-product-usecase'
import { PGCategoriesRepository } from '@infra/database/pg/repositories/pg-categories-repository'
import { PGProductsRepository } from '@infra/database/pg/repositories/pg-products-repository'
import { Request, Response } from 'express'
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
  async handle(req: Request, res: Response): Promise<Response> {
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

    return res.status(201).send()
  }
}

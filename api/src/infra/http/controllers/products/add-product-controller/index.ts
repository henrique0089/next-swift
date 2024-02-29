import { AddProductUseCase } from '@app/usecases/products/add-product-usecase'
import { PGCategoriesRepository } from '@infra/database/pg/repositories/pg-categories-repository'
import { PGProductsRepository } from '@infra/database/pg/repositories/pg-products-repository'
import { Request, Response } from 'express'
import { z } from 'zod'

const bodySchema = z.object({
  name: z.string(),
  description: z.string(),
  width: z.coerce.number(),
  height: z.coerce.number(),
  quantity: z.coerce.number(),
  price: z.coerce.number(),
  weight: z.coerce.number(),
  categories: z.string(),
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
    } = bodySchema.parse(req.body)
    const files = req.files as Express.Multer.File[]

    const productsRepo = new PGProductsRepository()
    const categoriesRepo = new PGCategoriesRepository()
    const addProductUseCase = new AddProductUseCase(
      productsRepo,
      categoriesRepo,
    )

    const images = files.map((file) => file.filename)

    await addProductUseCase.execute({
      name,
      description,
      width,
      height,
      weight,
      price,
      quantity,
      categories: JSON.parse(categories),
      images,
    })

    return res.status(201).send()
  }
}

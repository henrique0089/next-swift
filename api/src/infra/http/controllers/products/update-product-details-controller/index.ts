import { UpdateProductDetailsUseCase } from '@app/usecases/products/update-product-details-usecase'
import { PGProductsRepository } from '@infra/database/pg/repositories/pg-products-repository'
import { Request, Response } from 'express'
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
  async handle(req: Request, res: Response): Promise<Response> {
    const { productId } = paramsSchema.parse(req.params)
    const data = bodySchema.parse(req.body)

    const productsRepo = new PGProductsRepository()
    const updateProductDetailsUseCase = new UpdateProductDetailsUseCase(
      productsRepo,
    )

    await updateProductDetailsUseCase.execute({ productId, ...data })

    return res.status(204).send()
  }
}

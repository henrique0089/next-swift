import { GetProductDetailsUseCase } from '@app/usecases/products/get-product-details-usecase'
import { PGProductsRepository } from '@infra/database/pg/repositories/pg-products-repository'
import { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
  productId: z.string(),
})

export class GetProductDetailsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { productId } = paramsSchema.parse(req.params)

    const productsRepo = new PGProductsRepository()
    const getProductDetailsUseCase = new GetProductDetailsUseCase(productsRepo)

    const result = await getProductDetailsUseCase.execute({ productId })

    const product = {
      id: result.product.id,
      name: result.product.name,
      description: result.product.description,
      width: result.product.width,
      height: result.product.height,
      weight: result.product.weight,
      price: result.product.price,
      quantity: result.product.quantity,
    }

    return res.json({ product })
  }
}

import { RemoveProductUseCase } from '@app/usecases/products/remove-product-usecase'
import { PGProductsRepository } from '@infra/database/pg/repositories/pg-products-repository'
import { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
  productId: z.string().uuid(),
})

export class RemoveProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { productId } = paramsSchema.parse(req.params)

    const productsRepo = new PGProductsRepository()
    const removeProductUseCase = new RemoveProductUseCase(productsRepo)

    await removeProductUseCase.execute({ productId })

    return res.status(204).send()
  }
}

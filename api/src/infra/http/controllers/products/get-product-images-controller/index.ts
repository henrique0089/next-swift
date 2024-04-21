import { GetProductImagesUseCase } from '@app/usecases/products/get-product-images-usecase'
import { PGProductImagesRepository } from '@infra/database/pg/repositories/pg-product-images-repository'
import { env } from '@infra/env'
import { Request, Response } from 'express'
import { z } from 'zod'

const querySchema = z.object({
  productName: z.string(),
})

export class GetProductImagesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { productName } = querySchema.parse(req.query)

    const productImagesRepo = new PGProductImagesRepository()
    const getProductImagesUseCase = new GetProductImagesUseCase(
      productImagesRepo,
    )

    const response = await getProductImagesUseCase.execute({ productName })

    const images = response.images.map((img) => {
      return {
        id: img.id,
        url: `${env.UPLOADS_FOLDER_URL}/products/${img.url}`,
        productId: img.productId,
        createdAt: img.createdAt,
      }
    })

    return res.json({ images })
  }
}

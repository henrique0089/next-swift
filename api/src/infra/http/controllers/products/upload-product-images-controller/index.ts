import { UploadProductImagesUseCase } from '@app/usecases/products/upload-product-images-usecase'
import { PGProductImagesRepository } from '@infra/database/pg/repositories/pg-product-images-repository'
import { PGProductsRepository } from '@infra/database/pg/repositories/pg-products-repository'
import { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
  productId: z.string().uuid(),
})

export class UploadProductImagesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { productId } = paramsSchema.parse(req.params)
    const files = req.files as Express.Multer.File[]

    const productsRepo = new PGProductsRepository()
    const productImagesRepo = new PGProductImagesRepository()
    const uploadProductImagesUseCase = new UploadProductImagesUseCase(
      productsRepo,
      productImagesRepo,
    )

    await uploadProductImagesUseCase.execute({
      productId,
      images: files.map((file) => file.filename),
    })

    return res.status(201).send()
  }
}

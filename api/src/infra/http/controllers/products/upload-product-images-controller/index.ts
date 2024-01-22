import { UploadProductImagesUseCase } from '@app/usecases/products/upload-product-images-usecase'
import { PGProductImagesRepository } from '@infra/database/pg/repositories/pg-product-images-repository'
import { PGProductsRepository } from '@infra/database/pg/repositories/pg-products-repository'
import { uploadTo } from '@infra/utils/upload-to'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const paramsSchema = z.object({
  productId: z.string().uuid(),
})

export class UploadProductImagesController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<FastifyReply> {
    const { productId } = paramsSchema.parse(req.params)
    const parts = await req.saveRequestFiles()
    const filenames = []

    for await (const file of parts) {
      const { filename } = await uploadTo(file, 'products')

      filenames.push(filename)
    }

    const productsRepo = new PGProductsRepository()
    const productImagesRepo = new PGProductImagesRepository()
    const uploadProductImagesUseCase = new UploadProductImagesUseCase(
      productsRepo,
      productImagesRepo,
    )

    await uploadProductImagesUseCase.execute({
      productId,
      images: filenames,
    })

    return rep.status(201).send()
  }
}

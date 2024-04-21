import { Image } from '@app/entities/product/image'
import { ProductImagesRepository } from '@app/repositories/product-images-repository'

interface Request {
  productName: string
}

interface Response {
  images: Image[]
}

export class GetProductImagesUseCase {
  constructor(private productImagesRepo: ProductImagesRepository) {}

  async execute({ productName }: Request): Promise<Response> {
    const images = await this.productImagesRepo.findByProductName(productName)

    for (const img of images) {
      console.log({ id: img.id, productId: img.productId })
    }

    return {
      images,
    }
  }
}

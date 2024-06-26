import { AppError } from '@app/errors/app-error'
import { ProductImagesRepository } from '@app/repositories/product-images-repository'
import { ProductsRepository } from '@app/repositories/products-repository'

interface Request {
  productId: string
  imagesIds: string[]
}

type Response = void

export class RemoveProductImagesUseCase {
  constructor(
    private productsRepo: ProductsRepository,
    private productImagesRepo: ProductImagesRepository,
  ) {}

  async execute({ imagesIds, productId }: Request): Promise<Response> {
    const productExists = await this.productsRepo.findById(productId)

    if (!productExists) {
      throw new AppError('product not found!', 404)
    }

    await this.productImagesRepo.delete(imagesIds, productId)
  }
}

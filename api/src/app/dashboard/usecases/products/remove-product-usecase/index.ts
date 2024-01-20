import { AppError } from '@app/dashboard/errors/app-error'
import { ProductsRepository } from '@app/dashboard/repositories/products-repository'

interface Request {
  productId: string
}

type Response = void

export class RemoveProductUseCase {
  constructor(private productsRepo: ProductsRepository) {}

  async execute({ productId }: Request): Promise<Response> {
    const product = await this.productsRepo.findById(productId)

    if (!product) {
      throw new AppError('product not found!')
    }

    product.remove()

    await this.productsRepo.save(product)
  }
}

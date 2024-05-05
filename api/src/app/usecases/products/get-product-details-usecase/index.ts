import { Product } from '@app/entities/product'
import { AppError } from '@app/errors/app-error'
import { ProductsRepository } from '@app/repositories/products-repository'

interface Request {
  productId: string
}

interface Response {
  product: Product
}

export class GetProductDetailsUseCase {
  constructor(private productsRepo: ProductsRepository) {}

  async execute({ productId }: Request): Promise<Response> {
    const product = await this.productsRepo.findById(productId)

    if (!product) {
      throw new AppError('Product not found!')
    }

    return {
      product,
    }
  }
}

import { AppError } from '@app/dashboard/errors/app-error'
import { ProductsRepository } from '@app/dashboard/repositories/products-repository'

interface Request {
  productId: string
  name?: string
  description?: string
  width?: number
  height?: number
  quantity?: number
  price?: number
  weight?: number
}

type Response = void

export class UpdateProductDetailsUseCase {
  constructor(private productsRepo: ProductsRepository) {}

  async execute(data: Request): Promise<Response> {
    const {
      productId,
      name,
      description,
      width,
      height,
      quantity,
      price,
      weight,
    } = data

    const product = await this.productsRepo.findById(productId)

    if (!product) {
      throw new AppError('product not found!', 404)
    }

    product.name = name ?? product.name
    product.description = description ?? product.description
    product.width = width ?? product.width
    product.height = height ?? product.height
    product.quantity = quantity ?? product.quantity
    product.price = price ?? product.price
    product.weight = weight ?? product.weight
    product.update()

    await this.productsRepo.save(product)
  }
}

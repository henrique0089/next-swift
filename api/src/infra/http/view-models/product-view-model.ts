import { Product } from '@app/entities/product'
import { env } from '@infra/env'

export class ProductViewModel {
  static toHttp(product: Product) {
    return {
      id: product.id,
      name: product.name,
      desciption: product.description,
      coverImage: `${env.UPLOADS_FOLDER_URL}/products/${product.images[0].url}`,
      price: product.price,
      quantity: product.quantity,
    }
  }
}

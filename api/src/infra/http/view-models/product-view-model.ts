import { Product } from '@app/entities/product'

export class ProductViewModel {
  static toHttp(product: Product) {
    return {
      id: product.id,
      name: product.name,
      desciption: product.description,
      coverImage: product.images[0].url,
      price: product.price,
      quantity: product.quantity,
    }
  }
}

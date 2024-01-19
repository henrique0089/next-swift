import { Product } from '@app/dashboard/entities/product'
import {
  PaginateProductParams,
  ProductsRepository,
} from '@app/dashboard/repositories/products-repository'

export class InMemoryProductsRepository implements ProductsRepository {
  public products: Product[] = []

  async findById(productId: string): Promise<Product | null> {
    const product = this.products.find((product) => product.id === productId)

    if (!product) {
      return null
    }

    return product
  }

  async create(product: Product): Promise<void> {
    this.products.push(product)
  }

  async save(product: Product): Promise<void> {
    const productIndex = this.products.findIndex((p) => p.id === product.id)

    if (productIndex > -1) {
      this.products[productIndex] = product
    }
  }

  async paginate({
    page,
    limit = 10,
    categoryId,
  }: PaginateProductParams): Promise<Product[] | null> {
    const offset = (page - 1) * limit

    const filteredProducts = this.products.filter((product) =>
      product.categories.some((category) => category.id === categoryId),
    )

    const paginatedProducts = filteredProducts.slice(offset, offset + limit)

    return paginatedProducts
  }
}

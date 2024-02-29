import { Product } from '@app/entities/product'
import {
  PaginateProductParams,
  ProductsRepository,
  SearchProductParams,
} from '@app/repositories/products-repository'
import dayjs from 'dayjs'

export class InMemoryProductsRepository implements ProductsRepository {
  public products: Product[] = []

  async findById(productId: string): Promise<Product | null> {
    const product = this.products.find((product) => product.id === productId)

    if (!product) {
      return null
    }

    return product
  }

  async findManyByIds(productIds: string[]): Promise<Product[]> {
    const products = this.products.filter((product) =>
      productIds.includes(product.id),
    )

    return products
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
  }: PaginateProductParams): Promise<Product[]> {
    const offset = (page - 1) * limit

    const filteredProducts = this.products.filter((product) =>
      product.categories.some((category) => category.id === categoryId),
    )

    const paginatedProducts = filteredProducts.slice(offset, offset + limit)

    return paginatedProducts
  }

  async search({
    startDate,
    endDate,
    search,
    categories,
    page = 1,
  }: SearchProductParams): Promise<Product[]> {
    const searchStartDate =
      startDate || dayjs(new Date()).subtract(1, 'month').toDate()
    const searchEndDate = endDate || new Date()
    const offset = (page - 1) * 10

    let result: Product[] = []

    if (search && categories.length === 0) {
      result = this.products
        .filter(
          (product) =>
            product.createdAt >= searchStartDate &&
            product.createdAt <= searchEndDate &&
            (product.name.toLowerCase().includes(search.toLowerCase()) ||
              product.description.toLowerCase().includes(search.toLowerCase())),
        )
        .slice(offset, offset + 10)
    }

    return result
  }
}

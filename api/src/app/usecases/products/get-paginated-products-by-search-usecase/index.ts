import { Product } from '@app/entities/product'
import { ProductsRepository } from '@app/repositories/products-repository'

interface Request {
  startDate?: Date
  endDate?: Date
  search?: string
  categories?: string[]
  page?: number
}

interface Response {
  products: Product[]
}

export class GetPaginatedProductsBySearchUseCase {
  constructor(private productsRepo: ProductsRepository) {}

  async execute({
    startDate,
    endDate,
    search,
    page = 1,
    categories,
  }: Request): Promise<Response> {
    const products = await this.productsRepo.search({
      startDate,
      endDate,
      search,
      page,
      categories: categories ?? [],
    })

    return {
      products,
    }
  }
}

import { Product } from '../entities/product'

export type PaginateProductParams = {
  categoryId: string
  page: number
  limit?: number
}

export type SearchProductParams = {
  startDate?: Date
  endDate?: Date
  search?: string
  categories: string[]
  page?: number
}

export interface ProductsRepository {
  findById(productId: string): Promise<Product | null>
  findManyByIds(productIds: string[]): Promise<Product[]>
  create(product: Product): Promise<void>
  save(product: Product): Promise<void>
  paginate(params: PaginateProductParams): Promise<Product[]>
  search(params: SearchProductParams): Promise<Product[]>
}

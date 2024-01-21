import { Product } from '../entities/product'

export type PaginateProductParams = {
  categoryId: string
  page: number
  limit?: number
}

export interface ProductsRepository {
  findById(productId: string): Promise<Product | null>
  create(product: Product): Promise<void>
  save(product: Product): Promise<void>
  paginate(params: PaginateProductParams): Promise<Product[] | null>
  // search(params: SearchProductParams): Promise<Product[] | null>
}

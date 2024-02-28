import { Category } from '../entities/category'

export type PaginateParams = {
  search?: string
  page?: number
  limit?: number
}

export interface CategoriesRepository {
  paginate(params: PaginateParams): Promise<Category[]>
  findByName(name: string): Promise<Category | null>
  findById(categoryId: string): Promise<Category | null>
  findManyByIds(categoriesIds: string[]): Promise<Category[]>
  create(category: Category): Promise<void>
  delete(categoryId: string): Promise<void>
}

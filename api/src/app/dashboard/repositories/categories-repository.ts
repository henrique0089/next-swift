import { Category } from '../entities/category'

export interface CategoriesRepository {
  findAll(): Promise<Category[]>
  findByName(name: string): Promise<Category | null>
  findById(categoryId: string): Promise<Category | null>
  findManyByIds(categoriesIds: string[]): Promise<Category[]>
  create(category: Category): Promise<void>
  delete(categoryId: string): Promise<void>
}

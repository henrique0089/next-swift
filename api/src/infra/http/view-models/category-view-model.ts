import { Category } from '@app/dashboard/entities/category'

export class CategoryViewModel {
  static toHttp(category: Category) {
    return {
      id: category.id,
      name: category.name,
      createdAt: category.createdAt,
    }
  }
}

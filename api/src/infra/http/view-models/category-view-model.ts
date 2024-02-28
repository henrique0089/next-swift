import { Category } from '@app/entities/category'

export class CategoryViewModel {
  static toHttp(category: Category) {
    return {
      id: category.id,
      name: category.name,
      products: category.productsCount,
      createdAt: category.createdAt,
    }
  }
}

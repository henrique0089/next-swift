import { Category } from '@app/dashboard/entities/category'
import { CategoriesRepository } from '@app/dashboard/repositories/categories-repository'

interface Response {
  categories: Category[]
}

export class GetAllCategoriesUseCase {
  constructor(private categoriesRepo: CategoriesRepository) {}

  async execute(): Promise<Response> {
    const categories = await this.categoriesRepo.findAll()

    return {
      categories,
    }
  }
}

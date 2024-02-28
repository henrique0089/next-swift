import { Category } from '@app/entities/category'
import { CategoriesRepository } from '@app/repositories/categories-repository'

interface Response {
  categories: Category[]
}

export class GetAllCategoriesUseCase {
  constructor(private categoriesRepo: CategoriesRepository) {}

  async execute(): Promise<Response> {
    const categories = await this.categoriesRepo.paginate({})

    return {
      categories,
    }
  }
}

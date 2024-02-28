import { Category } from '@app/entities/category'
import { CategoriesRepository } from '@app/repositories/categories-repository'

interface Request {
  search: string
  limit?: number
  page?: number
}

interface Response {
  categories: Category[]
}

export class SearchCategoriesUseCase {
  constructor(private categoriesRepo: CategoriesRepository) {}

  async execute({ search, limit, page }: Request): Promise<Response> {
    const categories = await this.categoriesRepo.paginate({
      search,
      limit,
      page,
    })

    return {
      categories,
    }
  }
}

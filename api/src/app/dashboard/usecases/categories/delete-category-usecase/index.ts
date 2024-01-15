import { AppError } from '@app/dashboard/errors/app-error'
import { CategoriesRepository } from '@app/dashboard/repositories/categories-repository'

interface Request {
  categoryId: string
}

type Response = void

export class DeleteCategoryUseCase {
  constructor(private categoriesRepo: CategoriesRepository) {}

  async execute({ categoryId }: Request): Promise<Response> {
    const categoryExists = await this.categoriesRepo.findById(categoryId)

    if (!categoryExists) {
      throw new AppError('category not found!', 404)
    }

    await this.categoriesRepo.delete(categoryId)
  }
}

import { AppError } from '@app/errors/app-error'
import { CategoriesRepository } from '@app/repositories/categories-repository'

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

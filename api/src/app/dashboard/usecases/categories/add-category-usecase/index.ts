import { Category } from '@app/dashboard/entities/category'
import { AppError } from '@app/dashboard/errors/app-error'
import { CategoriesRepository } from '@app/dashboard/repositories/categories-repository'

interface Request {
  name: string
}

type Response = void

export class AddCategoryUseCase {
  constructor(private categoriesRepo: CategoriesRepository) {}

  async execute({ name }: Request): Promise<Response> {
    const categoryAlreadyExists = await this.categoriesRepo.findByName(name)

    if (categoryAlreadyExists) {
      throw new AppError('category already exists!')
    }

    const category = new Category({
      name,
    })

    await this.categoriesRepo.create(category)
  }
}

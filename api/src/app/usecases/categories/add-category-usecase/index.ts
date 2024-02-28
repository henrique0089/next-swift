import { Category } from '@app/entities/category'
import { AppError } from '@app/errors/app-error'
import { CategoriesRepository } from '@app/repositories/categories-repository'

interface Request {
  name: string
}

interface Response {
  category: Category
}

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

    return {
      category,
    }
  }
}

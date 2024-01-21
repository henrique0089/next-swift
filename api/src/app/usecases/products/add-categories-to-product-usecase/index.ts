import { AppError } from '@app/errors/app-error'
import { CategoriesRepository } from '@app/repositories/categories-repository'
import { ProductsRepository } from '@app/repositories/products-repository'

interface Request {
  productId: string
  categoriesIds: string[]
}

type Response = void

export class AddCategoyToProductUseCase {
  constructor(
    private productsRepo: ProductsRepository,
    private categoriesRepo: CategoriesRepository,
  ) {}

  async execute({ productId, categoriesIds }: Request): Promise<Response> {
    const product = await this.productsRepo.findById(productId)

    if (!product) {
      throw new AppError('product not found!', 404)
    }

    const categories = await this.categoriesRepo.findManyByIds(categoriesIds)

    if (categories.length === 0) {
      throw new AppError('categories not found!', 404)
    }

    const existingCategoryIds = product.categories.map((c) => c.id)
    const newCategories = categories.filter(
      (category) => !existingCategoryIds.includes(category.id),
    )

    const productCategories = [...product.categories, ...newCategories]

    product.categories = productCategories

    product.update()

    await this.productsRepo.save(product)
  }
}

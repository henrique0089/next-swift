import { Category } from '@app/dashboard/entities/category'
import { CategoriesRepository } from '@app/dashboard/repositories/categories-repository'

export class InMemoryCategoriesRepository implements CategoriesRepository {
  public categories: Category[] = []

  async findAll(): Promise<Category[]> {
    return this.categories
  }

  async findByName(name: string): Promise<Category | null> {
    const category = this.categories.find((category) => category.name === name)

    if (!category) {
      return null
    }

    return category
  }

  async findById(categoryId: string): Promise<Category | null> {
    const category = this.categories.find(
      (category) => category.id === categoryId,
    )

    if (!category) {
      return null
    }

    return category
  }

  async findManyByIds(categoriesIds: string[]): Promise<Category[]> {
    const categories = this.categories.filter((category) =>
      categoriesIds.includes(category.id),
    )

    return categories
  }

  async create(category: Category): Promise<void> {
    this.categories.push(category)
  }

  async delete(categoryId: string): Promise<void> {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id === categoryId,
    )

    this.categories.splice(categoryIndex, 1)
  }
}

import { Category } from '@app/entities/category'
import {
  CategoriesRepository,
  PaginateParams,
} from '@app/repositories/categories-repository'

export class InMemoryCategoriesRepository implements CategoriesRepository {
  public categories: Category[] = []

  async paginate({
    search,
    limit = 10,
    page = 1,
  }: PaginateParams): Promise<Category[]> {
    const start = (page - 1) * limit
    const end = page * limit

    let categories: Category[] = []

    if (search) {
      categories = this.categories
        .filter((category) => category.name.toLowerCase().includes(search))
        .slice(start, end)
    } else {
      categories = this.categories.slice(start, end)
    }

    return categories
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

    if (categoryIndex > -1) {
      this.categories.splice(categoryIndex, 1)
    }
  }
}

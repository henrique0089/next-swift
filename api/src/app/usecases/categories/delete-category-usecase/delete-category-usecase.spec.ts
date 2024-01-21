import { Category } from '@app/entities/category'
import { InMemoryCategoriesRepository } from 'src/test/dashboard/repositories/in-memory-categories-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { DeleteCategoryUseCase } from '.'

let inMemoryCategoriesRepository: InMemoryCategoriesRepository
let deleteCategoryUseCase: DeleteCategoryUseCase

beforeAll(() => {
  inMemoryCategoriesRepository = new InMemoryCategoriesRepository()
  deleteCategoryUseCase = new DeleteCategoryUseCase(
    inMemoryCategoriesRepository,
  )
})

describe('Add Category UseCase', () => {
  it('should be able to delete a category', async () => {
    const category = new Category({
      name: 'black-shoes',
    })

    await inMemoryCategoriesRepository.create(category)

    await deleteCategoryUseCase.execute({
      categoryId: category.id,
    })

    expect(inMemoryCategoriesRepository.categories).not.contains(category)
  })

  it('should not be able to delete a category if not exists', async () => {
    await expect(
      deleteCategoryUseCase.execute({
        categoryId: 'fake-category-id',
      }),
    ).rejects.toThrow('category not found!')
  })
})

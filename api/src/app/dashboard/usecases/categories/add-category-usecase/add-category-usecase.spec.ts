import { InMemoryCategoriesRepository } from 'src/test/dashboard/repositories/in-memory-categories-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { AddCategoryUseCase } from '.'

let inMemoryCategoriesRepository: InMemoryCategoriesRepository
let addCategoryUseCase: AddCategoryUseCase

beforeAll(() => {
  inMemoryCategoriesRepository = new InMemoryCategoriesRepository()
  addCategoryUseCase = new AddCategoryUseCase(inMemoryCategoriesRepository)
})

describe('Add Category UseCase', () => {
  it('should be able to add a new category', async () => {
    await addCategoryUseCase.execute({ name: 't-shirt' })

    expect(inMemoryCategoriesRepository.categories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 't-shirt',
        }),
      ]),
    )
  })
})

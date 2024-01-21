import { Category } from '@app/entities/category'
import { InMemoryCategoriesRepository } from 'src/test/dashboard/repositories/in-memory-categories-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { GetAllCategoriesUseCase } from '.'

let inMemoryCategoriesRepository: InMemoryCategoriesRepository
let getAllCategoriesUseCase: GetAllCategoriesUseCase

beforeAll(() => {
  inMemoryCategoriesRepository = new InMemoryCategoriesRepository()
  getAllCategoriesUseCase = new GetAllCategoriesUseCase(
    inMemoryCategoriesRepository,
  )
})

describe('Get All Categories UseCase', () => {
  it('should be able to get all categories', async () => {
    const category = new Category({
      name: 'pants',
    })

    await inMemoryCategoriesRepository.create(category)

    const { categories } = await getAllCategoriesUseCase.execute()

    expect(categories).toHaveLength(1)
    expect(categories[0].id).toEqual(category.id)
  })
})

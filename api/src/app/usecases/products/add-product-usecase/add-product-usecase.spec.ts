import { Category } from '@app/entities/category'
import { InMemoryCategoriesRepository } from 'src/test/dashboard/repositories/in-memory-categories-repository'
import { InMemoryProductsRepository } from 'src/test/dashboard/repositories/in-memory-products-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { AddProductUseCase } from '.'

let inMemoryProductsRepo: InMemoryProductsRepository
let inMemoryCategoriesRepo: InMemoryCategoriesRepository
let addProductUseCase: AddProductUseCase

beforeAll(() => {
  inMemoryProductsRepo = new InMemoryProductsRepository()
  inMemoryCategoriesRepo = new InMemoryCategoriesRepository()
  addProductUseCase = new AddProductUseCase(
    inMemoryProductsRepo,
    inMemoryCategoriesRepo,
  )
})

describe('Add Product UseCase', () => {
  it('should be able to add a new product', async () => {
    const shoesCategory = new Category({
      name: 'shoes',
    })
    const pantsCategory = new Category({
      name: 'pants',
    })

    await inMemoryCategoriesRepo.create(shoesCategory)
    await inMemoryCategoriesRepo.create(pantsCategory)

    const requestData = {
      name: 'Black shoes',
      description: 'Black shoes description',
      width: 56,
      height: 78,
      price: 7990,
      quantity: 23,
      weight: 258,
      categories: [shoesCategory.id, pantsCategory.id],
      images: ['image-01.png', 'image-02.png', 'image-03.png'],
    }

    await addProductUseCase.execute(requestData)

    expect(inMemoryProductsRepo.products[0].name).toBe('Black shoes')
    expect(inMemoryProductsRepo.products[0].categories).toHaveLength(2)
    expect(inMemoryProductsRepo.products[0].images).toHaveLength(3)
  })
})

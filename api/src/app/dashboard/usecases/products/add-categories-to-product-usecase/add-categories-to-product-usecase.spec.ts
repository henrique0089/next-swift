import { Category } from '@app/dashboard/entities/category'
import { Product } from '@app/dashboard/entities/product'
import { InMemoryCategoriesRepository } from 'src/test/dashboard/repositories/in-memory-categories-repository'
import { InMemoryProductsRepository } from 'src/test/dashboard/repositories/in-memory-products-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { AddCategoyToProductUseCase } from '.'

let inMemoryProductsRepo: InMemoryProductsRepository
let inMemoryCategoriesRepo: InMemoryCategoriesRepository
let addCategoriesToProductUseCase: AddCategoyToProductUseCase

beforeAll(() => {
  inMemoryProductsRepo = new InMemoryProductsRepository()
  inMemoryCategoriesRepo = new InMemoryCategoriesRepository()
  addCategoriesToProductUseCase = new AddCategoyToProductUseCase(
    inMemoryProductsRepo,
    inMemoryCategoriesRepo,
  )
})

describe('Add Categories To Products UseCase', () => {
  it('should be able add two categoriess to an existent product', async () => {
    const product = new Product({
      name: 't-shirt',
      description: 't-shirt description',
      width: 56,
      height: 78,
      price: 7990,
      quantity: 23,
      weight: 258,
      categories: [],
      images: [],
      updatedAt: null,
      removedAt: null,
    })

    const shoesCategory = new Category({
      name: 'shoes',
    })
    const pantsCategory = new Category({
      name: 'pants',
    })

    await inMemoryProductsRepo.create(product)
    await inMemoryCategoriesRepo.create(shoesCategory)
    await inMemoryCategoriesRepo.create(pantsCategory)

    await addCategoriesToProductUseCase.execute({
      productId: product.id,
      categoriesIds: [shoesCategory.id, pantsCategory.id],
    })

    expect(inMemoryProductsRepo.products[0].categories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: shoesCategory.id,
        }),
        expect.objectContaining({
          id: pantsCategory.id,
        }),
      ]),
    )
    expect(inMemoryProductsRepo.products[0].updatedAt).toBeDefined()
    expect(inMemoryProductsRepo.products[0].updatedAt).instanceOf(Date)
  })

  it('should not be able add categories to an non-existent product', async () => {
    await expect(
      addCategoriesToProductUseCase.execute({
        productId: 'fake-id',
        categoriesIds: ['category-id'],
      }),
    ).rejects.toThrow('product not found!')
  })

  it('should not be able add categories that not exists to an product', async () => {
    const product = new Product({
      name: 'blue pants',
      description: 'blue pants description',
      width: 56,
      height: 78,
      price: 7990,
      quantity: 23,
      weight: 258,
      categories: [],
      images: [],
      updatedAt: null,
      removedAt: null,
    })

    await inMemoryProductsRepo.create(product)

    await expect(
      addCategoriesToProductUseCase.execute({
        productId: product.id,
        categoriesIds: ['fake-category-id'],
      }),
    ).rejects.toThrow('categories not found!')
  })
})

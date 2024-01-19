import { InMemoryProductsRepository } from 'src/test/dashboard/repositories/in-memory-products-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { AddProductUseCase } from '.'

let inMemoryProductsRepo: InMemoryProductsRepository
let addProductUseCase: AddProductUseCase

beforeAll(() => {
  inMemoryProductsRepo = new InMemoryProductsRepository()
  addProductUseCase = new AddProductUseCase(inMemoryProductsRepo)
})

describe('Add Product UseCase', () => {
  it('should be able to add a new product', async () => {
    const requestData = {
      name: 'Black shoes',
      description: 'Black shoes description',
      width: 56,
      height: 78,
      price: 7990,
      quantity: 23,
      weight: 258,
      categories: ['asasjahsh', 'asasjhajsh'],
      images: ['image-01.png', 'image-02.png', 'image-03.png'],
    }

    await addProductUseCase.execute(requestData)

    expect(inMemoryProductsRepo.products[0].name).toBe('Black shoes')
    expect(inMemoryProductsRepo.products[0].categories).toHaveLength(2)
    expect(inMemoryProductsRepo.products[0].images).toHaveLength(3)
  })
})

import { Product } from '@app/entities/product'
import { InMemoryProductsRepository } from 'src/test/dashboard/repositories/in-memory-products-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { RemoveProductUseCase } from '.'

let inMemoryProductsRepo: InMemoryProductsRepository
let removeProductUseCase: RemoveProductUseCase

beforeAll(() => {
  inMemoryProductsRepo = new InMemoryProductsRepository()
  removeProductUseCase = new RemoveProductUseCase(inMemoryProductsRepo)
})

describe('Remove Product UseCase', () => {
  it('should be able to remove a product', async () => {
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

    await inMemoryProductsRepo.create(product)

    await removeProductUseCase.execute({ productId: product.id })

    expect(inMemoryProductsRepo.products[0].removedAt).toBeDefined()
    expect(inMemoryProductsRepo.products[0].removedAt).instanceOf(Date)
  })

  it('should not be able to remove a product that not exists', async () => {
    await expect(
      removeProductUseCase.execute({ productId: 'fake-id' }),
    ).rejects.toThrow('product not found!')
  })
})

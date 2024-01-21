import { Product } from '@app/entities/product'
import { InMemoryProductsRepository } from 'src/test/dashboard/repositories/in-memory-products-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { UpdateProductDetailsUseCase } from '.'

let inMemoryProductsRepo: InMemoryProductsRepository
let updateProductDetailsUseCase: UpdateProductDetailsUseCase

beforeAll(() => {
  inMemoryProductsRepo = new InMemoryProductsRepository()
  updateProductDetailsUseCase = new UpdateProductDetailsUseCase(
    inMemoryProductsRepo,
  )
})

describe('Update Product Details UseCase', () => {
  it('should be able to update product details', async () => {
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

    const requestData = {
      productId: product.id,
      name: 'white t-shirt',
    }

    await updateProductDetailsUseCase.execute(requestData)

    expect(inMemoryProductsRepo.products[0].name).toEqual('white t-shirt')
  })

  it('should not be able to update a product that not exists', async () => {
    await expect(
      updateProductDetailsUseCase.execute({ productId: 'fake-id' }),
    ).rejects.toThrow('product not found!')
  })
})

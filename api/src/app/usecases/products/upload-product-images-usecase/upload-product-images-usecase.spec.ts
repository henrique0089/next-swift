import { Product } from '@app/entities/product'
import { InMemoryProductImagesRepository } from 'src/test/dashboard/repositories/in-memory-product-images-repository'
import { InMemoryProductsRepository } from 'src/test/dashboard/repositories/in-memory-products-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { UploadProductImagesUseCase } from '.'

let inMemoryProductsRepo: InMemoryProductsRepository
let inMemoryProductImagesRepo: InMemoryProductImagesRepository
let uploadProductImagesUseCase: UploadProductImagesUseCase

beforeAll(() => {
  inMemoryProductsRepo = new InMemoryProductsRepository()
  inMemoryProductImagesRepo = new InMemoryProductImagesRepository()
  uploadProductImagesUseCase = new UploadProductImagesUseCase(
    inMemoryProductsRepo,
    inMemoryProductImagesRepo,
  )
})

describe('Upload Product Images UseCase', () => {
  it('should be able to upload new product images', async () => {
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

    await uploadProductImagesUseCase.execute({
      productId: product.id,
      images: ['img-01.png', 'img-02.png'],
    })

    expect(inMemoryProductImagesRepo.images).toHaveLength(2)
    expect(inMemoryProductImagesRepo.images).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          url: 'img-01.png',
        }),
        expect.objectContaining({
          url: 'img-02.png',
        }),
      ]),
    )
  })

  it('should not be able to upload images to a product that not exists', async () => {
    await expect(
      uploadProductImagesUseCase.execute({ productId: 'fake-id', images: [] }),
    ).rejects.toThrow('product not found!')
  })
})

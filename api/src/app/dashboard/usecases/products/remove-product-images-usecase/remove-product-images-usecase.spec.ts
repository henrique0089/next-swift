import { Product } from '@app/dashboard/entities/product'
import { Image } from '@app/dashboard/entities/product/image'
import { randomUUID } from 'crypto'
import { InMemoryProductImagesRepository } from 'src/test/dashboard/repositories/in-memory-product-images-repository'
import { InMemoryProductsRepository } from 'src/test/dashboard/repositories/in-memory-products-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { RemoveProductImagesUseCase } from '.'

let inMemoryProductsRepository: InMemoryProductsRepository
let inMemoryProductImagesRepository: InMemoryProductImagesRepository
let removeProductImagesUseCase: RemoveProductImagesUseCase

beforeAll(() => {
  inMemoryProductsRepository = new InMemoryProductsRepository()
  inMemoryProductImagesRepository = new InMemoryProductImagesRepository()
  removeProductImagesUseCase = new RemoveProductImagesUseCase(
    inMemoryProductsRepository,
    inMemoryProductImagesRepository,
  )
})

describe('Remove Product Images UseCase', () => {
  it('should be able to remove product images', async () => {
    const productId = randomUUID()

    const image01 = new Image({
      url: 'image-01.png',
      productId,
    })
    const image02 = new Image({
      url: 'image-02.png',
      productId,
    })
    const product = new Product(
      {
        name: 't-shirt',
        description: 't-shirt description',
        width: 56,
        height: 78,
        price: 7990,
        quantity: 23,
        weight: 258,
        categories: [],
        images: [image01, image02],
        updatedAt: null,
        removedAt: null,
      },
      productId,
    )

    await inMemoryProductsRepository.create(product)
    await inMemoryProductImagesRepository.create([image01, image02])

    await removeProductImagesUseCase.execute({
      imagesIds: [image01.id, image02.id],
      productId,
    })

    expect(inMemoryProductImagesRepository.images).not.contains(image01)
    expect(inMemoryProductImagesRepository.images).not.contains(image02)
  })

  it('should not be able to remove product images if product not exists', async () => {
    await expect(
      removeProductImagesUseCase.execute({
        productId: 'productId',
        imagesIds: ['img-01.png', 'img-02.png'],
      }),
    ).rejects.toThrow('product not found!')
  })
})

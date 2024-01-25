import { Product } from '@app/entities/product'
import { Image } from '@app/entities/product/image'
import { CategoriesRepository } from '@app/repositories/categories-repository'
// import { IBarCodeProvider } from '@app/providers/IBarCodeProvider'
// import { IStorageProvider } from '@app/providers/IStorageProvider'
import { ProductsRepository } from '@app/repositories/products-repository'
import { randomUUID } from 'crypto'

interface Request {
  name: string
  description: string
  width: number
  height: number
  quantity: number
  price: number
  weight: number
  categories: string[]
  images: string[]
}

type Response = void

export class AddProductUseCase {
  constructor(
    private productsRepo: ProductsRepository,
    private categoriesRepo: CategoriesRepository,
    // private storageProvider: IStorageProvider,
    // private barCodeProvider: IBarCodeProvider,
  ) {}

  async execute(data: Request): Promise<Response> {
    const {
      name,
      description,
      width,
      height,
      quantity,
      weight,
      price,
      categories,
      images,
    } = data

    const productCategories =
      await this.categoriesRepo.findManyByIds(categories)
    const productId = randomUUID()
    const productImages = images.map(
      (image) => new Image({ url: image, productId }),
    )

    const product = new Product(
      {
        name,
        description,
        width,
        height,
        quantity,
        price: price * 100,
        categories: productCategories,
        weight,
        images: productImages,
      },
      productId,
    )

    await this.productsRepo.create(product)

    // if (product.images) {
    //   for (const image of product.images) {
    //     await this.storageProvider.save(image.url, 'product')
    //   }
    // }

    // await this.barCodeProvider.generate(product.id)
  }
}

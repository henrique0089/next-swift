import { Image } from '@app/entities/product/image'
// import { IStorageProvider } from '@app/providers/IStorageProvider'
import { AppError } from '@app/errors/app-error'
import { ProductImagesRepository } from '@app/repositories/product-images-repository'
import { ProductsRepository } from '@app/repositories/products-repository'

interface Request {
  productId: string
  images: string[]
}

type Response = void

export class UploadProductImagesUseCase {
  constructor(
    private productsRepo: ProductsRepository,
    private productImagesRepo: ProductImagesRepository,
    // private storageProvider: IStorageProvider,
  ) {}

  async execute({ productId, images }: Request): Promise<Response> {
    const productExists = await this.productsRepo.findById(productId)

    if (!productExists) {
      throw new AppError('product not found!')
    }

    const productImages = images.map((image) => {
      return new Image({
        url: image,
        productId,
      })
    })

    await this.productImagesRepo.create(productImages)

    // for (const image of images) {
    //   await this.storageProvider.save(image, 'product')
    // }
  }
}

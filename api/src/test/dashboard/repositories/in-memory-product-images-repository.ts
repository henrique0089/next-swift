import { Image } from '@app/dashboard/entities/product/image'
import { ProductImagesRepository } from '@app/dashboard/repositories/product-images-repository'

export class InMemoryProductImagesRepository
  implements ProductImagesRepository
{
  public images: Image[] = []

  async findManyByIds(imageIds: string[]): Promise<Image[]> {
    const images = this.images.filter((img) => imageIds.includes(img.id))

    return images
  }

  async create(images: Image[]): Promise<void> {
    this.images.push(...images)
  }

  async delete(imagesIds: string[], productId: string): Promise<void> {
    this.images = this.images.filter(
      (img) => !(imagesIds.includes(img.id) && img.productId === productId),
    )
  }
}

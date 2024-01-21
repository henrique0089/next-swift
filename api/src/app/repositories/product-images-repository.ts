import { Image } from '../entities/product/image'

export interface ProductImagesRepository {
  findManyByIds(imageIds: string[]): Promise<Image[]>
  create(images: Image[]): Promise<void>
  delete(imagesIds: string[], productId: string): Promise<void>
}

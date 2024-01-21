/* eslint-disable prettier/prettier */
import { Image } from '@app/entities/product/image'
import { ProductImagesRepository } from '@app/repositories/product-images-repository'
import { client } from '../connection'

interface ProductImageRecord {
  id: string
  url: string
  product_id: string
  created_at: Date
}

export class PGProductImagesRepository implements ProductImagesRepository {
  async findManyByIds(imageIds: string[]): Promise<Image[]> {
    const query = "SELECT * FROM product_images WHERE id = ANY($1)"
    const { rows } = await client.query<ProductImageRecord>(query, [imageIds])

    const images: Image[] = []

    for (const data of rows) {
      const image = new Image({
        url: data.url,
        productId: data.product_id,
        createdAt: data.created_at,
      }, data.id)

      images.push(image)
    }

    return images
  }

  async create(images: Image[]): Promise<void> {
    const valuesPlaceHolder = images.map((_, i) => `($${i * 4 + 1}, ${i * 4 + 2}, ${i * 4 + 3}, ${i * 4 + 4})`).join(', ')

    const query = 
      `INSERT INTO product_images(id, url, product_id, created_at)
      VALUES ${valuesPlaceHolder};
      `
    
    const values = images.flatMap((img) => [img.id, img.url, img.productId, img.createdAt])

    await client.query(query, values)
  }

  async delete(imagesIds: string[], productId: string): Promise<void> {
    const deleteImagesQuery = 
      `DELETE FROM product_images
      WHERE id = ANY($1)
      AND product_id = $2;
      `

    await client.query(deleteImagesQuery, [imagesIds, productId]);
  }
}

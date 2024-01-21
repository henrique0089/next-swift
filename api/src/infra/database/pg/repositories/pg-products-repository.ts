/* eslint-disable prettier/prettier */
import { Category } from '@app/entities/category'
import { Product } from '@app/entities/product'
import { Image } from '@app/entities/product/image'
import {
  PaginateProductParams,
  ProductsRepository,
} from '@app/repositories/products-repository'
import { client } from '../connection'

interface ProductRecord {
  id: string
  name: string
  description: string
  width: number
  height: number
  weight: number
  price: number
  quantity: number
  removed_at: Date | null
  created_at: Date
  updated_at: Date | null
  categories: {
    id: string
    name: string
    created_at: Date
  }[]
  images: {
    id: string
    url: string
    product_id: string
    created_at: Date
  }[]
}

export class PGProductsRepository implements ProductsRepository {
  async findById(productId: string): Promise<Product | null> {
    const query = `SELECT p.id, p.name, p.description, p.width, p.height, p.weight, p.price, p.quantity, p.removed_at, p.created_at, p.updated_at,
        ARRAY_AGG(
          JSON_BUILD_OBJECT(
            'id', c.id,
            'name', c.name,
            'created_at', c.created_at
          )
        ) AS categories,
        ARRAY_AGG(
          JSON_BUILD_OBJECT(
            'id', pi.id,
            'url', pi.url,
            'product_id', pi.product_id,
            'created_at', pi.created_at
          )
        ) AS images
        FROM products p
        LEFT JOIN products_categories pc ON p.id = pc.product_id
        LEFT JOIN categories c ON c.id = pc.category_id
        LEFT JOIN product_images pi ON p.id = pi.product_id
        WHERE p.id = $1
        GROUP BY p.id, p.name, p.description, p.width, p.height, p.weight, p.price, p.quantity, p.removed_at, p.created_at, p.updated_at
        ORDER BY p.created_at
        LIMIT 1
      `
    const { rows } = await client.query<ProductRecord>(query, [productId])

    if (rows.length === 0) {
      return null
    }

    const data = rows[0]

    const productCategories = data.categories.map((category) => {
      return new Category(
        {
          name: category.name,
          createdAt: category.created_at,
        },
        category.id,
      )
    }).filter(c => c.name !== null)

    const productImages = data.images.map((img) => {
      return new Image(
        {
          url: img.url,
          productId: img.product_id,
          createdAt: img.created_at,
        },
        img.id,
      )
    }).filter(i => i.url !== null)

    const product = new Product(
      {
        name: data.name,
        description: data.description,
        width: data.width,
        height: data.height,
        weight: data.weight,
        price: data.price,
        quantity: data.quantity,
        categories: productCategories,
        images: productImages,
        updatedAt: data.updated_at,
        removedAt: data.removed_at,
      },
      data.id,
    )

    return product
  }

  async create(product: Product): Promise<void> {
    const { categories, images } = product

    const productsQuery = "INSERT INTO products (id, name, description, width, height, weight, price, quantity, removed_at, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)"
    const productsVals = [
      product.id,
      product.name,
      product.description,
      product.width,
      product.height,
      product.weight,
      product.price,
      product.quantity,
      product.removedAt,
      product.createdAt,
      product.updatedAt,
    ]

    await client.query(productsQuery, productsVals)

    if (categories.length > 0) {
      await this.createCategories(product.id, categories)
    }

    if (images.length > 0) {
      await this.createImages(product.id, images)
    }
  }

  private async createCategories(productId: string, categories: Category[]) {
    const categoriesValuesPlaceholder = categories.map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`).join(', ');
    const productCategoriesQuery = `INSERT INTO products_categories(product_id, category_id) VALUES ${categoriesValuesPlaceholder};`
    const categoriesVals = categories.flatMap((category) => [productId, category.id])

    await client.query(productCategoriesQuery, categoriesVals)
  }

  private async createImages(productId: string, images: Image[]) {
    const imagesValuesPlaceholder = images.map((_, i) => `($${i * 4 + 1}, $${i * 4 + 2}, $${i * 4 + 3}, $${i * 4 + 4})`).join(', ');
    const productImagesQuery = `INSERT INTO product_images (id, url, product_id, created_at) VALUES ${imagesValuesPlaceholder};`
    const productImagesVals = images.flatMap((img) => [img.id, img.url, productId, img.createdAt])

    await client.query(productImagesQuery, productImagesVals)
  }

  async save(product: Product): Promise<void> {
    const { images, categories } = product

    const productsQuery = 
      `UPDATE products
      SET name = $1, description = $2, width = $3, height = $4, weight = $5, price = $6, quantity = $7, removed_at = $8, updated_at = $9
      WHERE id = $10
      `
    const productsVals = [
      product.name, 
      product.description, 
      product.width, 
      product.height, 
      product.weight, 
      product.price, 
      product.quantity, 
      product.removedAt,
      product.updatedAt,
      product.id,
    ]

    await client.query(productsQuery, productsVals)

    const deleteImagesQuery = "DELETE FROM product_images WHERE product_id = $1"
    const deleteCategoriesQuery = "DELETE FROM products_categories WHERE product_id = $1"

    if (categories.length > 0) {
      await client.query(deleteCategoriesQuery, [product.id])
      await this.createCategories(product.id, categories)
    }
    
    if (images.length > 0) {
      await client.query(deleteImagesQuery, [product.id])
      await this.createImages(product.id, images)
    }
  }

  async paginate({ page, limit = 10, categoryId }: PaginateProductParams): Promise<Product[] | null> {
    const offset = (page - 1) * limit

    const query = 
      `SELECT p.id, p.name, p.description, p.width, p.height, p.weight, p.price, p.quantity, p.removed_at, p.created_at, p.updated_at
      ARRAY_AGG(
        JSON_BUILD_OBJECT(
          'id', c.id,
          'name', c.name,
          'created_at', c.created_at
        )
      ) AS categories
      ARRAY_AGG(
        JSON_BUILD_OBJECT(
          'id', pi.id,
          'url', pi.url,
          'product_id', pi.product_id,
          'created_at', pi.created_at
        )
      ) AS images
      FROM products p
      JOIN products_categories pc ON p.id = pc.product_id
      JOIN categories c ON c.id = pc.category_id
      JOIN product_images pi ON c.id = pi.product_id
      GROUP BY p.id, p.name, p.description, p.width, p.height, p.weight, p.price, p.quantity, p.removed_at, p.created_at, p.updated_at
      WHERE c.id = $1
      ORDER BY p.created_at
      LIMIT $2 OFFSET $3
      `
    
    const { rows } = await client.query<ProductRecord>(query, [categoryId, limit, offset])

    const products: Product[] = []

    for (const data of rows) {
      const product = new Product(
        {
          name: data.name,
          description: data.description,
          width: data.width,
          height: data.height,
          weight: data.weight,
          price: data.price,
          quantity: data.quantity,
          categories: data.categories.map((category) => {
            return new Category(
              {
                name: category.name,
                createdAt: category.created_at,
              },
              category.id,
            )
          }),
          images: data.images.map((img) => {
            return new Image(
              {
                url: img.url,
                productId: img.product_id,
                createdAt: img.created_at,
              },
              img.id,
            )
          }),
          updatedAt: data.updated_at,
          removedAt: data.removed_at,
        },
        data.id,
      )

      products.push(product)
    }

    return products
  }
}

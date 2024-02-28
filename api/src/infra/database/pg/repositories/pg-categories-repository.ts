import { Category } from '@app/entities/category'
import {
  CategoriesRepository,
  PaginateParams,
} from '@app/repositories/categories-repository'
import { client } from '../connection'

interface CategoryRecord {
  id: string
  name: string
  products_count: string
  created_at: Date
}

export class PGCategoriesRepository implements CategoriesRepository {
  async paginate({
    search,
    limit = 10,
    page = 1,
  }: PaginateParams): Promise<Category[]> {
    const offset = (page - 1) * limit
    let query = ''
    const values: any[] = []

    if (search) {
      query = `SELECT c.id, c.name, c.created_at, COUNT(pc.product_id) AS products_count
      FROM categories c 
      LEFT JOIN products_categories pc ON c.id = pc.category_id
      WHERE c.name ILIKE %1
      GROUP BY c.id, c.name, c.created_at
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3`

      values.push(`%${search}%`)
      values.push(limit)
      values.push(offset)
    } else {
      query = `SELECT c.id, c.name, c.created_at, COUNT(pc.product_id) AS products_count
      FROM categories c 
      LEFT JOIN products_categories pc ON c.id = pc.category_id
      GROUP BY c.id, c.name, c.created_at
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2`

      values.push(limit)
      values.push(offset)
    }

    const { rows } = await client.query<CategoryRecord>(query, values)

    const categories: Category[] = []

    for (const data of rows) {
      const category = new Category(
        {
          name: data.name,
          productsCount: parseInt(data.products_count),
          createdAt: data.created_at,
        },
        data.id,
      )

      categories.push(category)
    }

    return categories
  }

  async findByName(name: string): Promise<Category | null> {
    const query = `SELECT * FROM categories WHERE name = $1 LIMIT 1`
    const { rows } = await client.query<CategoryRecord>(query, [name])

    if (rows.length === 0) {
      return null
    }

    const data = rows[0]

    const category = new Category(
      {
        name: data.name,
        createdAt: data.created_at,
      },
      data.id,
    )

    return category
  }

  async findById(categoryId: string): Promise<Category | null> {
    const query = `SELECT * FROM categories WHERE id = $1 LIMIT 1`
    const { rows } = await client.query<CategoryRecord>(query, [categoryId])

    if (rows.length === 0) {
      return null
    }

    const data = rows[0]

    const category = new Category(
      {
        name: data.name,
        createdAt: data.created_at,
      },
      data.id,
    )

    return category
  }

  async findManyByIds(categoriesIds: string[]): Promise<Category[]> {
    const query = `SELECT * FROM categories WHERE id = ANY($1)`
    const { rows } = await client.query<CategoryRecord>(query, [categoriesIds])

    const categories: Category[] = []

    for (const data of rows) {
      const role = new Category(
        {
          name: data.name,
          createdAt: data.created_at,
        },
        data.id,
      )

      categories.push(role)
    }

    return categories
  }

  async create(category: Category): Promise<void> {
    const query = `INSERT INTO categories (id, name, created_at) VALUES ($1, $2, $3)`

    await client.query(query, [category.id, category.name, category.createdAt])
  }

  async delete(categoryId: string): Promise<void> {
    const query = `DELETE FROM categories WHERE id = $1`

    await client.query(query, [categoryId])
  }
}

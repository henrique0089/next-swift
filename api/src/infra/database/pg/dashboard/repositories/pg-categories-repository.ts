/* eslint-disable prettier/prettier */
import { Category } from '@app/dashboard/entities/category'
import { CategoriesRepository } from '@app/dashboard/repositories/categories-repository'
import { client } from '../../connection'

interface CategoryRecord {
  id: string
  name: string
  created_at: Date
}

export class PGCategoriesRepository implements CategoriesRepository {
  async findAll(): Promise<Category[]> {
    const query = "SELECT * FROM categories"
    const { rows } = await client.query<CategoryRecord>(query)

    const categories: Category[] = []

    for (const data of rows) {
      const role = new Category({
        name: data.name,
        createdAt: data.created_at,
      }, data.id)

      categories.push(role)
    }

    return categories
  }

  async findByName(name: string): Promise<Category | null> {
    const query = "SELECT * FROM categories WHERE name = $1 LIMIT 1"
    const { rows } = await client.query<CategoryRecord>(
      query,
      [name],
    )

    if (rows.length === 0) {
      return null
    }

    const data = rows[0]

    const category = new Category({
      name: data.name,
      createdAt: data.created_at,
    }, data.id)

    return category
  }

  async findById(categoryId: string): Promise<Category | null> {
    const query = "SELECT * FROM categories WHERE id = $1 LIMIT 1"
    const { rows } = await client.query<CategoryRecord>(
      query,
      [categoryId],
    )

    if (rows.length === 0) {
      return null
    }

    const data = rows[0]

    const category = new Category({
      name: data.name,
      createdAt: data.created_at,
    }, data.id)

    return category
  }

  async findManyByIds(categoriesIds: string[]): Promise<Category[]> {
    const query = "SELECT * FROM categories WHERE id = ANY($1)";
    const { rows } = await client.query<CategoryRecord>(query, [categoriesIds]);

    const categories: Category[] = []

    for (const data of rows) {
      const role = new Category({
        name: data.name,
        createdAt: data.created_at,
      }, data.id)

      categories.push(role)
    }

    return categories
  }

  async create(category: Category): Promise<void> {
    const query = "INSERT INTO categories (id, name, created_at) VALUES ($1, $2, $3)"

    await client.query(query, [category.id, category.name, category.createdAt])
  }

  async delete(categoryId: string): Promise<void> {
    const query = "DELETE FROM categories WHERE id = $1"

    await client.query(query, [categoryId])
  }
}

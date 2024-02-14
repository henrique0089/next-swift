import { RolesRepository } from '@app/repositories/roles-repository'
import { client } from '../connection'

interface RoleRecord {
  name: string
}

export class PGRolesRepository implements RolesRepository {
  async findAll(): Promise<string[]> {
    const query = `SELECT * FROM roles`
    const { rows } = await client.query<RoleRecord>(query)

    const roles: string[] = []

    for (const data of rows) {
      roles.push(data.name)
    }

    return roles
  }

  async findByName(name: string): Promise<string | null> {
    const query = `SELECT * FROM roles WHERE name = $1 LIMIT 1`
    const { rows } = await client.query<RoleRecord>(query, [name])

    if (rows.length === 0) {
      return null
    }

    const data = rows[0]

    return data.name
  }

  async create(role: string): Promise<void> {
    const query = `INSERT INTO roles (name) VALUES ($1)`

    await client.query(query, [role])
  }
}

/* eslint-disable prettier/prettier */
import { Role } from '@app/dashboard/entities/role'
import { RolesRepository } from '@app/dashboard/repositories/roles-repository'
import { client } from '../../connection'

interface RoleRecord {
  id: string
  name: string
  created_at: Date
}

export class PGRolesRepository implements RolesRepository {
  async findByName(name: string): Promise<Role | null> {
    const query = "SELECT * FROM categories WHERE name = $1 LIMIT 1"
    const { rows } = await client.query<RoleRecord>(
      query,
      [name],
    )

    if (rows.length === 0) {
      return null
    }

    const data = rows[0]

    const role = new Role({
      name: data.name,
      createdAt: data.created_at,
    }, data.id)

    return role
  }

  async create(role: Role): Promise<void> {
    const query = "INSERT INTO roles (id, name, created_at) VALUES ($1, $2, $3)"

    await client.query(query, [role.id, role.name, role.createdAt])
  }
}

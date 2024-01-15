import request from 'supertest'
import { afterAll, beforeAll, describe, it } from 'vitest'

import { app } from '@infra/app'
import { client } from '@infra/database/pg/connection'
import { randomUUID } from 'crypto'

beforeAll(async () => {
  process.env.NODE_ENV = 'test'

  const rolesTableQuery = `
    CREATE TABLE IF NOT EXISTS roles (
      id VARCHAR(100) PRIMARY KEY,
      name VARCHAR(20) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
    );
  `
  await client.query(rolesTableQuery)

  const employeesTableQuery = `
    CREATE TABLE IF NOT EXISTS employees (
      id VARCHAR(100) PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      ddd INT UNIQUE NOT NULL,
      phone INT UNIQUE NOT NULL,
      avatar VARCHAR(200),
      role_id VARCHAR(100),
      dismissed_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP,
      FOREIGN KEY (role_id) REFERENCES roles(id)
    );
  `

  await client.query(employeesTableQuery)

  await client.query(
    'INSERT INTO roles (id, name, created_at) VALUES ($1, $2)',
    [randomUUID(), 'editor'],
  )
})

afterAll(async () => {
  const rolesTableQuery = 'DROP TABLE IF EXISTS roles;'
  const employeesTableQuery = 'DROP TABLE IF EXISTS employees;'

  await client.query(rolesTableQuery)
  await client.query(employeesTableQuery)

  process.env.NODE_ENV = 'development'
})

describe('Hire Employee Controller', () => {
  it('should be able to hire an employee', async () => {
    await app.ready()

    const query = 'SELECT * FROM roles WHERE name = $1 LIMIT 1'
    const { rows } = await client.query(query, ['editor'])
    console.log(process.env.NODE_ENV)

    await request(app.server)
      .post('/dashboard/employees')
      .send({
        firstName: 'jhon',
        lastName: 'doe',
        email: 'jhondoe@gmail.com',
        ddd: 99,
        phone: 999999999,
        roleId: rows[0].id,
      })
      .expect(201)
  })
})

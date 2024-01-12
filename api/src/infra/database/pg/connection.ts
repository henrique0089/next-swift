import { Pool } from 'pg'

export const client = new Pool({
  user: 'henrique',
  password: '123456',
  host: 'localhost',
  database: 'nextswift',
  port: 5432,
})

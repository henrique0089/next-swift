import { FastifyInstance } from 'fastify'
import { categoriesRoutes } from './categories'
import { employeesRoutes } from './employees'

export async function appRoutes(app: FastifyInstance) {
  app.register(employeesRoutes)
  app.register(categoriesRoutes)
}

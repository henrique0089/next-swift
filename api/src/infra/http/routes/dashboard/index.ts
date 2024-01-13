import { FastifyInstance } from 'fastify'
import { categoriesRoutes } from './categories'
import { employeesRoutes } from './employees'

export async function dashboardRoutes(app: FastifyInstance) {
  app.register(employeesRoutes)
  app.register(categoriesRoutes)
}

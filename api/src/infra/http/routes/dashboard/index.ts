import { FastifyInstance } from 'fastify'
import { categoriesRoutes } from './categories'
import { employeesRoutes } from './employees'
import { rolesRoutes } from './roles'

export async function dashboardRoutes(app: FastifyInstance) {
  app.register(employeesRoutes)
  app.register(rolesRoutes)
  app.register(categoriesRoutes)
}

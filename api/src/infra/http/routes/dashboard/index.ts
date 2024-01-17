import { FastifyInstance } from 'fastify'
import { categoriesRoutes } from './categories'
import { customersRoutes } from './customers'
import { employeesRoutes } from './employees'
import { rolesRoutes } from './roles'

export async function dashboardRoutes(app: FastifyInstance) {
  app.register(employeesRoutes)
  app.register(customersRoutes)
  app.register(rolesRoutes)
  app.register(categoriesRoutes)
}

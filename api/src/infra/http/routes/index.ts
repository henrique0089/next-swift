import { FastifyInstance } from 'fastify'
import { categoriesRoutes } from './categories'
import { customersRoutes } from './customers'
import { employeesRoutes } from './employees'
import { productsRoutes } from './products'
import { rolesRoutes } from './roles'

export async function appRoutes(app: FastifyInstance) {
  app.register(employeesRoutes)
  app.register(customersRoutes)
  app.register(rolesRoutes)
  app.register(categoriesRoutes)
  app.register(productsRoutes)
}

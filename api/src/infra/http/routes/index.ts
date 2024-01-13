import { FastifyInstance } from 'fastify'
import { dashboardRoutes } from './dashboard'

export async function appRoutes(app: FastifyInstance) {
  app.register(dashboardRoutes, { prefix: '/dashboard' })
}

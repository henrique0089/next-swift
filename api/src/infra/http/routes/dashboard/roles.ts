import { AddRoleController } from '@infra/http/controllers/dashboard/roles/add-role-controller'
import { FastifyInstance } from 'fastify'

const addRoleController = new AddRoleController()

export async function rolesRoutes(app: FastifyInstance) {
  app.post('/roles', addRoleController.handle)
}

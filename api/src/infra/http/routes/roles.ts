import { AddRoleController } from '@infra/http/controllers/roles/add-role-controller'
import { Router } from 'express'

const addRoleController = new AddRoleController()

const rolesRouter = Router()

rolesRouter.post('/', addRoleController.handle)

export { rolesRouter as rolesRoutes }

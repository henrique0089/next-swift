import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node'
import { AddRoleController } from '@infra/http/controllers/roles/add-role-controller'
import { Router } from 'express'
import { GetAllRolesController } from '../controllers/roles/get-all-roles-controller'

const getAllRolesController = new GetAllRolesController()
const addRoleController = new AddRoleController()

const rolesRouter = Router()

rolesRouter.get('/', ClerkExpressRequireAuth(), getAllRolesController.handle)
rolesRouter.post('/', addRoleController.handle)

export { rolesRouter as rolesRoutes }

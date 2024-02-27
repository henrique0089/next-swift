import { DismissEmployeeController } from '@infra/http/controllers/employees/dismiss-employee-controller'
import { GetAllEmployeesController } from '@infra/http/controllers/employees/get-all-employees-controller'
import { HireEmployeeController } from '@infra/http/controllers/employees/hire-employee-controller'
import { Router } from 'express'
import { ClerkExpressRequireAuth } from '../middlewares/clerk-require-auth'

const getAllEmployeesController = new GetAllEmployeesController()
const hireEmployeeController = new HireEmployeeController()
const dismissEmployeeController = new DismissEmployeeController()

const employeesRouter = Router()

employeesRouter.get(
  '/',
  ClerkExpressRequireAuth(),
  getAllEmployeesController.handle,
)

employeesRouter.post(
  '/',
  ClerkExpressRequireAuth(),
  hireEmployeeController.handle,
)

employeesRouter.delete(
  '/dismiss',
  ClerkExpressRequireAuth(),
  dismissEmployeeController.handle,
)

export { employeesRouter as employeesRoutes }

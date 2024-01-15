import { FastifyInstance } from 'fastify'

import { DismissEmployeeController } from '@infra/http/controllers/dashboard/employees/dismiss-employee-controller'
import { GetAllEmployeesController } from '@infra/http/controllers/dashboard/employees/get-all-employees-controller'
import { GetProfileInfoController } from '@infra/http/controllers/dashboard/employees/get-profile-info-controller'
import { HireEmployeeController } from '@infra/http/controllers/dashboard/employees/hire-employee-controller'

const getAllEmployeesController = new GetAllEmployeesController()
const hireEmployeeController = new HireEmployeeController()
const getProfileInfoController = new GetProfileInfoController()
const dismissEmployeeController = new DismissEmployeeController()

export async function employeesRoutes(app: FastifyInstance) {
  app.get('/employees', getAllEmployeesController.handle)
  app.post('/employees', hireEmployeeController.handle)
  app.get('/employees/me', getProfileInfoController.handle)
  app.delete('/employees/dismiss', dismissEmployeeController.handle)
}

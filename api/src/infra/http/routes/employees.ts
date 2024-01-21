import { FastifyInstance } from 'fastify'

import { DismissEmployeeController } from '@infra/http/controllers/employees/dismiss-employee-controller'
import { GetAllEmployeesController } from '@infra/http/controllers/employees/get-all-employees-controller'
import { HireEmployeeController } from '@infra/http/controllers/employees/hire-employee-controller'

const getAllEmployeesController = new GetAllEmployeesController()
const hireEmployeeController = new HireEmployeeController()
const dismissEmployeeController = new DismissEmployeeController()

export async function employeesRoutes(app: FastifyInstance) {
  app.get('/employees', getAllEmployeesController.handle)
  app.post('/employees', hireEmployeeController.handle)
  app.delete('/employees/dismiss', dismissEmployeeController.handle)
}

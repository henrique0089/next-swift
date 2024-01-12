import { FastifyInstance } from 'fastify'

import { GetAllEmployeesController } from '../controllers/employees/get-all-employees-controller'
import { HireEmployeeController } from '../controllers/employees/hire-employee-controller'

const getAllEmployeesController = new GetAllEmployeesController()
const hireEmployeeController = new HireEmployeeController()

export async function employeesRoutes(app: FastifyInstance) {
  app.get('/employees', getAllEmployeesController.handle)
  app.post('/employees', hireEmployeeController.handle)
}

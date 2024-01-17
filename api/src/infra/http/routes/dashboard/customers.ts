import { AddCustomerController } from '@infra/http/controllers/dashboard/customers/add-customer-controller'
import { GetPaginatedCustomersController } from '@infra/http/controllers/dashboard/customers/get-paginated-customers-controller'
import { FastifyInstance } from 'fastify'

const getPaginatedCustomersController = new GetPaginatedCustomersController()
const addCustomerController = new AddCustomerController()

export async function customersRoutes(app: FastifyInstance) {
  app.get('/customers', getPaginatedCustomersController.handle)
  app.post('/customers', addCustomerController.handle)
}

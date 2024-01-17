import { AddCustomerController } from '@infra/http/controllers/dashboard/customers/add-customer-controller'
import { GetPaginatedCustomersController } from '@infra/http/controllers/dashboard/customers/get-paginated-customers-controller'
import { RemoveCustomerController } from '@infra/http/controllers/dashboard/customers/remove-customer-controller'
import { FastifyInstance } from 'fastify'

const getPaginatedCustomersController = new GetPaginatedCustomersController()
const addCustomerController = new AddCustomerController()
const removeCustomerController = new RemoveCustomerController()

export async function customersRoutes(app: FastifyInstance) {
  app.get('/customers', getPaginatedCustomersController.handle)
  app.post('/customers', addCustomerController.handle)
  app.patch('/customers/:customerId', removeCustomerController.handle)
}

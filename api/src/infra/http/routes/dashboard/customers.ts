import { AddCustomerController } from '@infra/http/controllers/dashboard/customers/add-customer-controller'
import { FastifyInstance } from 'fastify'

const addCustomerController = new AddCustomerController()

export async function customersRoutes(app: FastifyInstance) {
  app.post('/customers', addCustomerController.handle)
}

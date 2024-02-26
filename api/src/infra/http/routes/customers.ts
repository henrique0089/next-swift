import { AddCustomerController } from '@infra/http/controllers/customers/add-customer-controller'
import { GetPaginatedCustomersController } from '@infra/http/controllers/customers/get-paginated-customers-controller'
import { RemoveCustomerController } from '@infra/http/controllers/customers/remove-customer-controller'
import { UpdateCustomerDetailsController } from '@infra/http/controllers/customers/update-customer-details-controller'
import { Router } from 'express'

const getPaginatedCustomersController = new GetPaginatedCustomersController()
const addCustomerController = new AddCustomerController()
const removeCustomerController = new RemoveCustomerController()
const updateCustomerDetailsController = new UpdateCustomerDetailsController()

const customersRouter = Router()

customersRouter.get('/', getPaginatedCustomersController.handle)
customersRouter.post('/', addCustomerController.handle)
customersRouter.delete('/:customerId/remove', removeCustomerController.handle)
customersRouter.put(
  '/:customerId/update',
  updateCustomerDetailsController.handle,
)

export { customersRouter as customersRoutes }

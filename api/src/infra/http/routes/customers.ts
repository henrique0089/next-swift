import { AddCustomerController } from '@infra/http/controllers/customers/add-customer-controller'
import { GetPaginatedCustomersController } from '@infra/http/controllers/customers/get-paginated-customers-controller'
import { RemoveCustomerController } from '@infra/http/controllers/customers/remove-customer-controller'
import { UpdateCustomerDetailsController } from '@infra/http/controllers/customers/update-customer-details-controller'
import { Router } from 'express'
import { GetCustomerDetailsController } from '../controllers/customers/get-customer-details-controller'
import { ClerkExpressRequireAuth } from '../middlewares/clerk-require-auth'

const getPaginatedCustomersController = new GetPaginatedCustomersController()
const getCustomerDetailsController = new GetCustomerDetailsController()
const addCustomerController = new AddCustomerController()
const removeCustomerController = new RemoveCustomerController()
const updateCustomerDetailsController = new UpdateCustomerDetailsController()

const customersRouter = Router()

customersRouter.get(
  '/',
  ClerkExpressRequireAuth(),
  getPaginatedCustomersController.handle,
)
customersRouter.get(
  '/:customerId/details',
  ClerkExpressRequireAuth(),
  getCustomerDetailsController.handle,
)
customersRouter.post(
  '/',
  ClerkExpressRequireAuth(),
  addCustomerController.handle,
)
customersRouter.delete(
  '/:customerId/remove',
  ClerkExpressRequireAuth(),
  removeCustomerController.handle,
)
customersRouter.put(
  '/:customerId/update',
  ClerkExpressRequireAuth(),
  updateCustomerDetailsController.handle,
)

export { customersRouter as customersRoutes }

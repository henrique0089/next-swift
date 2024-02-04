import { AddSupplierController } from '@infra/http/controllers/suppliers/add-supplier-controller'
import { GetPaginatedSuppliersController } from '@infra/http/controllers/suppliers/get-paginated-suppliers-controller'
import { RemoveSupplierController } from '@infra/http/controllers/suppliers/remove-supplier-controller'
import { UpdateSupplierDetailsController } from '@infra/http/controllers/suppliers/update-supplier-details-controller'
import { Router } from 'express'

const getPaginatedsuppliersController = new GetPaginatedSuppliersController()
const addSupplierController = new AddSupplierController()
const removeSupplierController = new RemoveSupplierController()
const updateSupplierDetailsController = new UpdateSupplierDetailsController()

const suppliersRouter = Router()

suppliersRouter.get('/', getPaginatedsuppliersController.handle)
suppliersRouter.post('/', addSupplierController.handle)
suppliersRouter.delete('/:supplierId/remove', removeSupplierController.handle)
suppliersRouter.put(
  '/:supplierId/update',
  updateSupplierDetailsController.handle,
)

export { suppliersRouter as suppliersRoutes }

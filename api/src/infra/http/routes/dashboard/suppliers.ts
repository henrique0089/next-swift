import { AddSupplierController } from '@infra/http/controllers/dashboard/suppliers/add-supplier-controller'
import { GetPaginatedSuppliersController } from '@infra/http/controllers/dashboard/suppliers/get-paginated-suppliers-controller'
import { RemoveSupplierController } from '@infra/http/controllers/dashboard/suppliers/remove-supplier-controller'
// import { UpdatesupplierDetailsController } from '@infra/http/controllers/dashboard/suppliers/update-supplier-details-controller'
import { FastifyInstance } from 'fastify'

const getPaginatedsuppliersController = new GetPaginatedSuppliersController()
const addSupplierController = new AddSupplierController()
const removeSupplierController = new RemoveSupplierController()
// const updatesupplierDetailsController = new UpdatesupplierDetailsController()

export async function suppliersRoutes(app: FastifyInstance) {
  app.get('/suppliers', getPaginatedsuppliersController.handle)
  app.post('/suppliers', addSupplierController.handle)
  app.delete('/suppliers/:supplierId/remove', removeSupplierController.handle)
  // app.put(
  //   '/suppliers/:supplierId/update',
  //   updatesupplierDetailsController.handle,
  // )
}

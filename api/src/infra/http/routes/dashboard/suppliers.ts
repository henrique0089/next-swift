// import { AddSupplierController } from '@infra/http/controllers/dashboard/suppliers/add-supplier-controller'
import { GetPaginatedSuppliersController } from '@infra/http/controllers/dashboard/suppliers/get-paginated-suppliers-controller'
// import { RemovesupplierController } from '@infra/http/controllers/dashboard/suppliers/remove-supplier-controller'
// import { UpdatesupplierDetailsController } from '@infra/http/controllers/dashboard/suppliers/update-supplier-details-controller'
import { FastifyInstance } from 'fastify'

const getPaginatedsuppliersController = new GetPaginatedSuppliersController()
// const addsupplierController = new AddsupplierController()
// const removesupplierController = new RemovesupplierController()
// const updatesupplierDetailsController = new UpdatesupplierDetailsController()

export async function suppliersRoutes(app: FastifyInstance) {
  app.get('/suppliers', getPaginatedsuppliersController.handle)
  // app.post('/suppliers', addsupplierController.handle)
  // app.patch('/suppliers/:supplierId/remove', removesupplierController.handle)
  // app.put(
  //   '/suppliers/:supplierId/update',
  //   updatesupplierDetailsController.handle,
  // )
}

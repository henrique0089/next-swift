import { AddCategoriesToProductController } from '@infra/http/controllers/dashboard/products/add-categories-to-product-controller'
import { AddProductController } from '@infra/http/controllers/dashboard/products/add-product-controller'
import { RemoveProductController } from '@infra/http/controllers/dashboard/products/remove-product-controller'
import { UpdateProductDetailsController } from '@infra/http/controllers/dashboard/products/update-product-details-controller'
import { FastifyInstance } from 'fastify'

const addProductController = new AddProductController()
const addCategoriesToProductController = new AddCategoriesToProductController()
const updateProductDetailsController = new UpdateProductDetailsController()
const removeProductController = new RemoveProductController()

export async function productsRoutes(app: FastifyInstance) {
  app.post('/products', addProductController.handle)
  app.post(
    '/products/:productId/categories/add',
    addCategoriesToProductController.handle,
  )
  app.put('/products/:productId/update', updateProductDetailsController.handle)
  app.patch('/products/:productId/remove', removeProductController.handle)
}

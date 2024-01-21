import { AddCategoriesToProductController } from '@infra/http/controllers/products/add-categories-to-product-controller'
import { AddProductController } from '@infra/http/controllers/products/add-product-controller'
import { RemoveProductController } from '@infra/http/controllers/products/remove-product-controller'
import { RemoveProductImagesController } from '@infra/http/controllers/products/remove-product-images-controller'
import { UpdateProductDetailsController } from '@infra/http/controllers/products/update-product-details-controller'
import { FastifyInstance } from 'fastify'

const addProductController = new AddProductController()
const addCategoriesToProductController = new AddCategoriesToProductController()
const updateProductDetailsController = new UpdateProductDetailsController()
const removeProductController = new RemoveProductController()
const removeProductImagesController = new RemoveProductImagesController()

export async function productsRoutes(app: FastifyInstance) {
  app.post('/products', addProductController.handle)
  app.post(
    '/products/:productId/categories/add',
    addCategoriesToProductController.handle,
  )
  app.put('/products/:productId/update', updateProductDetailsController.handle)
  app.patch('/products/:productId/remove', removeProductController.handle)
  app.patch(
    '/products/:productId/images/remove',
    removeProductImagesController.handle,
  )
}

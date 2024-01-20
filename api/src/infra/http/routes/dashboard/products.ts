import { AddCategoriesToProductController } from '@infra/http/controllers/dashboard/products/add-categories-to-product-controller'
import { AddProductController } from '@infra/http/controllers/dashboard/products/add-product-controller'
import { FastifyInstance } from 'fastify'

const addProductController = new AddProductController()
const addCategoriesToProductController = new AddCategoriesToProductController()

export async function productsRoutes(app: FastifyInstance) {
  app.post('/products', addProductController.handle)
  app.post(
    '/products/:productId/categories/add',
    addCategoriesToProductController.handle,
  )
}

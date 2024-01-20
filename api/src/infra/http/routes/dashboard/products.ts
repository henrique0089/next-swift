import { AddProductController } from '@infra/http/controllers/dashboard/products/add-product-controller'
import { FastifyInstance } from 'fastify'

const addProductController = new AddProductController()

export async function productsRoutes(app: FastifyInstance) {
  app.post('/products', addProductController.handle)
}

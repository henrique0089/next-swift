import { FastifyInstance } from 'fastify'
import { SaleProductController } from '../controllers/sales/sale-product-controller'

const saleProductController = new SaleProductController()

export async function salesRoutes(app: FastifyInstance) {
  app.post('/sales', saleProductController.handle)
}

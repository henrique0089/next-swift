import { FastifyInstance } from 'fastify'
import { GenerateExcelReportController } from '../controllers/sales/generate-excel-report-controller'
import { SaleProductController } from '../controllers/sales/sale-product-controller'

const saleProductController = new SaleProductController()
const generateExcelReportController = new GenerateExcelReportController()

export async function salesRoutes(app: FastifyInstance) {
  app.post('/sales', saleProductController.handle)
  app.get('/sales/report/excel', generateExcelReportController.handle)
}

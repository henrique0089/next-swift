import { Router } from 'express'
import { GenerateExcelReportController } from '../controllers/sales/generate-excel-report-controller'
import { GeneratePDFReportController } from '../controllers/sales/generate-pdf-report-controller'
import { GetRecentSalesController } from '../controllers/sales/get-last-six-sales-controller'
import { GetPaginatedSalesController } from '../controllers/sales/get-paginated-sales-controller'
import { SaleProductController } from '../controllers/sales/sale-product-controller'
import { UpdateSaleStatusController } from '../controllers/sales/update-sale-status-controller'
import { ClerkExpressRequireAuth } from '../middlewares/clerk-require-auth'

const saleProductController = new SaleProductController()
const generateExcelReportController = new GenerateExcelReportController()
const generatePDFReportController = new GeneratePDFReportController()
const getRecentSalesController = new GetRecentSalesController()
const getPaginatedSalesController = new GetPaginatedSalesController()
const updateSaleStatusController = new UpdateSaleStatusController()

const salesRouter = Router()

salesRouter.post('/', ClerkExpressRequireAuth(), saleProductController.handle)

salesRouter.get(
  '/',
  ClerkExpressRequireAuth(),
  getPaginatedSalesController.handle,
)

salesRouter.get(
  '/report/excel',
  ClerkExpressRequireAuth(),
  generateExcelReportController.handle,
)

salesRouter.get(
  '/report/pdf',
  ClerkExpressRequireAuth(),
  generatePDFReportController.handle,
)

salesRouter.get(
  '/recent',
  ClerkExpressRequireAuth(),
  getRecentSalesController.handle,
)

salesRouter.patch(
  '/:saleId/update-status',
  ClerkExpressRequireAuth(),
  updateSaleStatusController.handle,
)

export { salesRouter as salesRoutes }

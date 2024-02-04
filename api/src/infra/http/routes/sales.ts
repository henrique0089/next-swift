import { Router } from 'express'
import { GenerateExcelReportController } from '../controllers/sales/generate-excel-report-controller'
import { GeneratePDFReportController } from '../controllers/sales/generate-pdf-report-controller'
import { GetLastSixSalesController } from '../controllers/sales/get-last-six-sales-controller'
import { GetPaginatedSalesController } from '../controllers/sales/get-paginated-sales-controller'
import { SaleProductController } from '../controllers/sales/sale-product-controller'

const saleProductController = new SaleProductController()
const generateExcelReportController = new GenerateExcelReportController()
const generatePDFReportController = new GeneratePDFReportController()
const getLastSixSalesController = new GetLastSixSalesController()
const getPaginatedSalesController = new GetPaginatedSalesController()

const salesRouter = Router()

salesRouter.post('/', saleProductController.handle)
salesRouter.get('/', getPaginatedSalesController.handle)
salesRouter.get('/report/excel', generateExcelReportController.handle)
salesRouter.get('/report/pdf', generatePDFReportController.handle)
salesRouter.get('/last-six', getLastSixSalesController.handle)

export { salesRouter as salesRoutes }

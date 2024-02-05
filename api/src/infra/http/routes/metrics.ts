import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node'
import { Router } from 'express'
import { GenerateRevenueReportController } from '../controllers/metrics/generate-revenue-report-controllers'
import { GetMetricsController } from '../controllers/metrics/get-metrics-controllers'
import { GetRevenueInPeriodMetricsController } from '../controllers/metrics/get-revenue-in-period-metrics-controller'

const getMetricsController = new GetMetricsController()
const getRevenueInPeriodMetricsController =
  new GetRevenueInPeriodMetricsController()
const generateRevenueReportController = new GenerateRevenueReportController()

const metricsRouter = Router()

metricsRouter.get(
  '/cards',
  ClerkExpressRequireAuth(),
  getMetricsController.handle,
)
metricsRouter.get(
  '/revenue',
  ClerkExpressRequireAuth(),
  getRevenueInPeriodMetricsController.handle,
)
metricsRouter.get(
  '/revenue/report',
  ClerkExpressRequireAuth(),
  generateRevenueReportController.handle,
)

export { metricsRouter as metricsRoutes }

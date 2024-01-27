import { FastifyInstance } from 'fastify'

import { GenerateRevenueReportController } from '../controllers/metrics/generate-revenue-report-controllers'
import { GetMetricsController } from '../controllers/metrics/get-metrics-controllers'
import { GetRevenueInPeriodMetricsController } from '../controllers/metrics/get-revenue-in-period-metrics-controller'

const getMetricsController = new GetMetricsController()
const getRevenueInPeriodMetricsController =
  new GetRevenueInPeriodMetricsController()
const generateRevenueReportController = new GenerateRevenueReportController()

export async function metricsRoutes(app: FastifyInstance) {
  app.get('/metrics/cards', getMetricsController.handle)
  app.get('/metrics/revenue', getRevenueInPeriodMetricsController.handle)
  app.get('/metrics/revenue/report', generateRevenueReportController.handle)
}

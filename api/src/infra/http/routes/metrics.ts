import { FastifyInstance } from 'fastify'

import { GetMetricsController } from '../controllers/metrics/get-metrics-controllers'
import { GetRevenueInPeriodMetricsController } from '../controllers/metrics/get-revenue-in-period-metrics-controller'

const getMetricsController = new GetMetricsController()
const getRevenueInPeriodMetricsController =
  new GetRevenueInPeriodMetricsController()

export async function metricsRoutes(app: FastifyInstance) {
  app.get('/metrics/cards', getMetricsController.handle)
  app.get('/metrics/revenue', getRevenueInPeriodMetricsController.handle)
}

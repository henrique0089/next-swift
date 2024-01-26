import { SalesRepository } from '@app/repositories/sales-repository'

interface Request {
  startDate: Date
  endDate: Date
}

interface Response {
  metrics: {
    date: string
    revenue: number
  }[]
}

export class GetRevenueInPeriodMetricsUseCase {
  constructor(private readonly salesRepo: SalesRepository) {}

  async execute({ startDate, endDate }: Request): Promise<Response> {
    const metrics = await this.salesRepo.getRevenueMetrics({
      startDate,
      endDate,
    })

    return {
      metrics,
    }
  }
}

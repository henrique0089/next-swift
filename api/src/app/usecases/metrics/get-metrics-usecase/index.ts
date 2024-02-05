import { CustomersRepository } from '@app/repositories/customer-repository'
import { SalesRepository } from '@app/repositories/sales-repository'

interface Response {
  metrics: {
    salesCurrentMonthTotal: number
    salesCurrentMonthPercentageIncrease: number
    salesTodayTotalCount: number
    salesTodayPercentageIncrease: number
    canceledSalesTotalCount: number
    canceledSalesPercentageIncrease: number
    customersCurrentMonthTotalCount: number
    customersPercentageIncrease: number
  }
}

export class GetMetricsUseCase {
  constructor(
    private salesRepo: SalesRepository,
    private customersRepo: CustomersRepository,
  ) {}

  async execute(): Promise<Response> {
    const salesCurrentMonthTotalString =
      await this.salesRepo.getCurrentMonthTotal()

    const salesLastMonthTotalString = await this.salesRepo.getLastMonthTotal()

    const salesCurrentMonthTotal = Number(salesCurrentMonthTotalString) / 100
    const salesLastMonthTotal = Number(salesLastMonthTotalString) / 100

    let salesCurrentMonthPercentageIncrease = 0

    if (salesLastMonthTotal > 0) {
      salesCurrentMonthPercentageIncrease = this.getPercentage(
        salesCurrentMonthTotal,
        salesLastMonthTotal,
      )
    }

    const salesTodayTotalCount = await this.salesRepo.getTodayTotalCount()

    const salesPreviousDayTotalCount =
      await this.salesRepo.getPreviousDayTotalCount()

    let salesTodayPercentageIncrease = 0

    if (salesPreviousDayTotalCount > 0) {
      salesTodayPercentageIncrease = this.getPercentage(
        salesTodayTotalCount,
        salesPreviousDayTotalCount,
      )
    }

    const canceledSalesTotalCount =
      await this.salesRepo.getCanceledSalesTotalCount()

    const canceledSalesLastMonthTotalCount =
      await this.salesRepo.getLastMonthCanceledSalesTotalCount()

    let canceledSalesPercentageIncrease = 0

    if (canceledSalesLastMonthTotalCount > 0) {
      canceledSalesPercentageIncrease = this.getPercentage(
        canceledSalesTotalCount,
        canceledSalesLastMonthTotalCount,
      )
    }

    const customersCurrentMonthTotalCount =
      await this.customersRepo.getCurrentMonthTotalCount()

    const lastMonthCustomersTotalCount =
      await this.customersRepo.getLastMonthTotalCount()

    let customersPercentageIncrease = 0

    if (lastMonthCustomersTotalCount > 0) {
      customersPercentageIncrease = this.getPercentage(
        customersCurrentMonthTotalCount,
        lastMonthCustomersTotalCount,
      )
    }

    const metrics = {
      salesCurrentMonthTotal,
      salesCurrentMonthPercentageIncrease,
      salesTodayTotalCount,
      salesTodayPercentageIncrease,
      canceledSalesTotalCount,
      canceledSalesPercentageIncrease,
      customersCurrentMonthTotalCount,
      customersPercentageIncrease,
    }

    return {
      metrics,
    }
  }

  private getPercentage(current: number, previous: number): number {
    return ((current - previous) / previous) * 100
  }
}

import { CustomersRepository } from '@app/repositories/customer-repository'
import { SalesRepository } from '@app/repositories/sales-repository'

interface Response {
  metrics: {
    salesCurrentMonthTotal: number
    salesCurrentMonthPercentageIncrease: string
    salesTodayTotalCount: number
    salesTodayPercentageIncrease: string
    canceledSalesTotalCount: number
    canceledSalesPercentageIncrease: string
    customersCurrentMonthTotalCount: number
    customersPercentageIncrease: string
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

    let salesPercentageIncrease = 0

    if (salesLastMonthTotal > 0) {
      salesPercentageIncrease = this.getPercentage(
        salesCurrentMonthTotal,
        salesLastMonthTotal,
      )
    }

    const salesPercentageIncreaseFormatted = `${salesPercentageIncrease.toFixed(
      0,
    )}%`

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

    const salesTodayPercentageIncreaseFormatted = `${salesTodayPercentageIncrease.toFixed(
      0,
    )}%`

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

    const canceledSalesPercentageIncreaseFormatted = `${canceledSalesPercentageIncrease.toFixed(
      0,
    )}%`

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

    const customersPercentageIncreaseFormatted = `${customersPercentageIncrease.toFixed(
      0,
    )}%`

    const metrics = {
      salesCurrentMonthTotal,
      salesCurrentMonthPercentageIncrease: salesPercentageIncreaseFormatted,
      salesTodayTotalCount,
      salesTodayPercentageIncrease: salesTodayPercentageIncreaseFormatted,
      canceledSalesTotalCount,
      canceledSalesPercentageIncrease: canceledSalesPercentageIncreaseFormatted,
      customersCurrentMonthTotalCount,
      customersPercentageIncrease: customersPercentageIncreaseFormatted,
    }

    return {
      metrics,
    }
  }

  private getPercentage(current: number, previous: number): number {
    return ((current - previous) / previous) * 100
  }
}

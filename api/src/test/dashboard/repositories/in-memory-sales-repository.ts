import { PaymentStatus, Sale } from '@app/entities/sale'
import {
  PaginateParams,
  RevenueMetrics,
  RevenueParams,
  SalesRepository,
} from '@app/repositories/sales-repository'
import dayjs from 'dayjs'

export class InMemorySalesRepository implements SalesRepository {
  public sales: Sale[] = []

  async create(sale: Sale): Promise<void> {
    this.sales.push(sale)
  }

  async paginate({
    startDate,
    endDate,
    search,
    paymentMethod,
    status,
    page = 1,
    limit = 10,
  }: PaginateParams): Promise<Sale[]> {
    const offset = (page - 1) * limit

    let filteredSales: Sale[] = []
    let paginatedSales: Sale[] = []

    if (startDate && endDate && !search && !paymentMethod && !status) {
      filteredSales = this.sales.filter((sale) => {
        return sale.createdAt >= startDate && sale.createdAt <= endDate
      })
      paginatedSales = filteredSales.slice(offset, offset + limit)
    } else if (!startDate && !endDate && search && !paymentMethod && !status) {
      filteredSales = this.sales.filter((sale) =>
        sale.productName.includes(search),
      )
      paginatedSales = filteredSales.slice(offset, offset + limit)
    } else if (!startDate && !endDate && !search && paymentMethod && !status) {
      filteredSales = this.sales.filter(
        (sale) => sale.paymentMethod === paymentMethod,
      )
      paginatedSales = filteredSales.slice(offset, offset + limit)
    } else if (!startDate && !endDate && !search && paymentMethod && !status) {
      filteredSales = this.sales.filter((sale) => sale.status === status)
      paginatedSales = filteredSales.slice(offset, offset + limit)
    } else {
      paginatedSales = this.sales.slice(offset, offset + limit)
    }

    return paginatedSales
  }

  async getLastSix(): Promise<Sale[]> {
    const sales = this.sales.reverse().slice(0, 6)

    return sales
  }

  async getCurrentMonthTotal(): Promise<string> {
    const currentMonth = dayjs().format('YYYY-MM-DD').split('-')[1]

    const filteredSales = this.sales.filter((sale) => {
      const isSameMonth =
        dayjs(sale.createdAt).format('YYYY-MM-DD').split('-')[1] ===
        currentMonth

      return isSameMonth
    })

    const totalSum = filteredSales.reduce((acc, current) => {
      return acc + current.total
    }, 0)

    return totalSum.toFixed(0)
  }

  async getLastMonthTotal(): Promise<string> {
    const lastMonth = dayjs()
      .subtract(1, 'month')
      .format('YYYY-MM-DD')
      .split('-')[1]

    const filteredSales = this.sales.filter((sale) => {
      const isSameMonth =
        dayjs(sale.createdAt).format('YYYY-MM-DD').split('-')[1] === lastMonth

      return isSameMonth
    })

    const totalSum = filteredSales.reduce((acc, current) => {
      return acc + current.total
    }, 0)

    return totalSum.toFixed(0)
  }

  async getTodayTotalCount(): Promise<number> {
    const today = dayjs().format('YYYY-MM-DD').split('-')[2]

    const filteredSales = this.sales.filter((sale) => {
      const isSameMonth =
        dayjs(sale.createdAt).format('YYYY-MM-DD').split('-')[2] === today

      return isSameMonth
    })

    return filteredSales.length
  }

  async getPreviousDayTotalCount(): Promise<number> {
    const yesterday = dayjs()
      .subtract(1, 'day')
      .format('YYYY-MM-DD')
      .split('-')[2]

    const filteredSales = this.sales.filter((sale) => {
      const isSameMonth =
        dayjs(sale.createdAt).format('YYYY-MM-DD').split('-')[2] === yesterday

      return isSameMonth
    })

    return filteredSales.length
  }

  async getCanceledSalesTotalCount(): Promise<number> {
    const currentMonth = dayjs().format('YYYY-MM-DD').split('-')[1]

    const filteredSales = this.sales.filter((sale) => {
      const isSameMonth =
        dayjs(sale.createdAt).format('YYYY-MM-DD').split('-')[1] ===
        currentMonth

      return isSameMonth && sale.status === PaymentStatus.CANCELED
    })

    return filteredSales.length
  }

  async getLastMonthCanceledSalesTotalCount(): Promise<number> {
    const lastMonth = dayjs()
      .subtract(1, 'month')
      .format('YYYY-MM-DD')
      .split('-')[1]

    const filteredSales = this.sales.filter((sale) => {
      const isSameMonth =
        dayjs(sale.createdAt).format('YYYY-MM-DD').split('-')[1] === lastMonth

      return isSameMonth && sale.status === PaymentStatus.CANCELED
    })

    return filteredSales.length
  }

  async getRevenueMetrics({
    startDate,
    endDate,
  }: RevenueParams): Promise<RevenueMetrics[]> {
    const metrics = this.sales
      .filter(
        (sale) => sale.createdAt >= startDate && sale.createdAt <= endDate,
      )
      .map((sale) => {
        const formattedDate = dayjs(sale.createdAt).format('DD/MM')

        return {
          date: formattedDate,
          revenue: sale.total,
        }
      })

    return metrics
  }
}

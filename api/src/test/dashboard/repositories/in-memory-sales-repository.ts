import { Sale } from '@app/entities/sale'
import {
  PaginateParams,
  SalesRepository,
} from '@app/repositories/sales-repository'

export class InMemorySalesRepository implements SalesRepository {
  public sales: Sale[] = []

  async create(sale: Sale): Promise<void> {
    this.sales.push(sale)
  }

  async paginate({
    startDate,
    endDate,
    page = 1,
    limit = 10,
  }: PaginateParams): Promise<Sale[]> {
    const offset = (page - 1) * limit

    const filteredSales = this.sales.filter((product) => {
      return product.createdAt >= startDate && product.createdAt <= endDate
    })

    const paginatedSales = filteredSales.slice(offset, offset + limit)

    return paginatedSales
  }
}

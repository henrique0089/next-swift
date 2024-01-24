import { Sale } from '@app/entities/sale'

export interface PaginateParams {
  startDate: Date
  endDate: Date
  page?: number
  limit?: number
}

export interface SalePaginatedResult {
  id: string
  productName: string
  productQty: number
  productPrice: number
  total: number
}

export interface SalesRepository {
  create(sale: Sale): Promise<void>
  paginate(params: PaginateParams): Promise<Sale[]>
}

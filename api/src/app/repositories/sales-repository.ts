import { PaymentMethod, PaymentStatus, Sale } from '@app/entities/sale'

export interface PaginateParams {
  startDate?: Date
  endDate?: Date
  search?: string
  paymentMethod?: PaymentMethod
  status?: PaymentStatus
  limit?: number
  page?: number
}

export interface SalePaginatedResult {
  id: string
  productName: string
  productQty: number
  productPrice: number
  total: number
}

export interface RevenueParams {
  startDate: Date
  endDate: Date
}

export interface RevenueMetrics {
  date: Date
  revenue: number
}

export interface SalesRepository {
  create(sale: Sale): Promise<void>
  paginate(params: PaginateParams): Promise<Sale[]>
  getLastSix(): Promise<Sale[]>
  getCurrentMonthTotal(): Promise<string>
  getLastMonthTotal(): Promise<string>
  getTodayTotalCount(): Promise<number>
  getPreviousDayTotalCount(): Promise<number>
  getCanceledSalesTotalCount(): Promise<number>
  getLastMonthCanceledSalesTotalCount(): Promise<number>
  getRevenueMetrics(params: RevenueParams): Promise<RevenueMetrics[]>
}

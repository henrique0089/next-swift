import { PaymentMethod, PaymentStatus, Sale } from '@app/entities/sale'
import {
  PaginateParams,
  RevenueMetrics,
  RevenueParams,
  SalesRepository,
} from '@app/repositories/sales-repository'
import dayjs from 'dayjs'
import { client } from '../connection'

interface SaleRecord {
  id: string
  total: number
  status: PaymentStatus
  qty: number
  payment_method: PaymentMethod
  product_id: string
  product_name: string
  product_price: number
  buyer_id: string
  buyer_name: string
  created_at: Date
}

interface TotalRecord {
  sum: number
}

export class PGSalesRepository implements SalesRepository {
  async create(sale: Sale): Promise<void> {
    const {
      id,
      total,
      status,
      productQty,
      paymentMethod,
      productId,
      buyerId,
      createdAt,
    } = sale

    const query =
      'INSERT INTO sales (id, total, status, qty, payment_method, product_id, buyer_id, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8)'

    await client.query(query, [
      id,
      total,
      status,
      productQty,
      paymentMethod,
      productId,
      buyerId,
      createdAt,
    ])
  }

  async paginate({
    startDate,
    endDate,
    page = 1,
    limit = 10,
  }: PaginateParams): Promise<Sale[]> {
    const searchStartDate = dayjs(startDate).startOf('day').toDate()
    const searchEndDate = dayjs(endDate).endOf('day').toDate()

    const offset = (page - 1) * limit
    const query = `SELECT s.id, s.total, s.status, s.qty, s.payment_method, s.product_id, s.buyer_id, s.created_at, p.name AS product_name, p.price AS product_price, c.name AS buyer_name
      FROM sales s
      JOIN products p ON s.product_id = p.id
      JOIN customers c ON s.buyer_id = c.id
      WHERE s.created_at BETWEEN $1 AND $2
      GROUP BY s.id, s.total, s.status, s.qty, s.payment_method, s.product_id, s.buyer_id, s.created_at, p.name, p.price, p.quantity, c.name
      ORDER BY s.created_at DESC 
      LIMIT $3 OFFSET $4
    `

    const { rows } = await client.query<SaleRecord>(query, [
      searchStartDate,
      searchEndDate,
      limit,
      offset,
    ])

    const sales: Sale[] = []

    for (const data of rows) {
      const sale = new Sale(
        {
          total: data.total,
          status: data.status,
          paymentMethod: data.payment_method,
          buyerId: data.buyer_id,
          buyerName: data.buyer_name,
          productId: data.product_id,
          productName: data.product_name,
          productQty: data.qty,
          productPrice: data.product_price,
          createdAt: data.created_at,
        },
        data.id,
      )

      sales.push(sale)
    }

    return sales
  }

  async getLastSix(): Promise<Sale[]> {
    const query = `SELECT s.id, s.total, s.status, s.qty, s.payment_method, s.product_id, s.buyer_id, s.created_at, p.name AS product_name, p.price AS product_price, c.name AS buyer_name
      FROM sales s
      JOIN products p ON s.product_id = p.id
      JOIN customers c ON s.buyer_id = c.id
      GROUP BY s.id, s.total, s.status, s.qty, s.payment_method, s.product_id, s.buyer_id, s.created_at, p.name, p.price, p.quantity, c.name
      ORDER BY s.created_at DESC 
      LIMIT 6
    `

    const { rows } = await client.query<SaleRecord>(query)

    const sales: Sale[] = []

    for (const data of rows) {
      const sale = new Sale(
        {
          total: data.total,
          status: data.status,
          paymentMethod: data.payment_method,
          buyerId: data.buyer_id,
          buyerName: data.buyer_name,
          productId: data.product_id,
          productName: data.product_name,
          productQty: data.qty,
          productPrice: data.product_price,
          createdAt: data.created_at,
        },
        data.id,
      )

      sales.push(sale)
    }

    return sales
  }

  async getCurrentMonthTotal(): Promise<string> {
    const query = `SELECT SUM(total) FROM sales WHERE EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE)`

    const { rows } = await client.query<TotalRecord>(query)

    const total = Number(rows[0].sum).toFixed(2) ?? Number(0).toFixed(2)

    return total
  }

  async getLastMonthTotal(): Promise<string> {
    const query = `SELECT SUM(total) FROM sales WHERE EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE - interval '1 month')`

    const { rows } = await client.query<TotalRecord>(query)

    const total = Number(rows[0].sum).toFixed(2) ?? Number(0).toFixed(2)

    return total
  }

  async getTodayTotalCount(): Promise<number> {
    const query = `SELECT COUNT(total) FROM sales WHERE EXTRACT(DAY FROM created_at) = EXTRACT(DAY FROM CURRENT_DATE)`

    const { rows } = await client.query<{ count: number }>(query)

    const total = Number(rows[0].count)

    return total
  }

  async getPreviousDayTotalCount(): Promise<number> {
    const query = `SELECT COUNT(total) FROM sales WHERE EXTRACT(DAY FROM created_at) = EXTRACT(DAY FROM CURRENT_DATE - interval '1 day')`

    const { rows } = await client.query<{ count: number }>(query)

    const total = rows[0].count

    return total
  }

  async getCanceledSalesTotalCount(): Promise<number> {
    const query = `SELECT COUNT(total) FROM sales WHERE EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE) AND status = 'CANCELED'`

    const { rows } = await client.query<{ count: number }>(query)

    const total = Number(rows[0].count)

    return total
  }

  async getLastMonthCanceledSalesTotalCount(): Promise<number> {
    const query = `SELECT COUNT(total) FROM sales WHERE EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE - interval '1 month') AND status = 'CANCELED'`

    const { rows } = await client.query<{ count: number }>(query)

    const total = rows[0].count

    return total
  }

  async getRevenueMetrics({
    startDate,
    endDate,
  }: RevenueParams): Promise<RevenueMetrics[]> {
    const searchStartDate = dayjs(startDate).startOf('day').toDate()
    const searchEndDate = dayjs(endDate).endOf('day').toDate()

    const sql = `SELECT TO_CHAR(created_at, 'DD/MM') AS date,
      total / 100.0 AS revenue
      FROM sales
      WHERE created_at BETWEEN $1 AND $2
      ORDER BY created_at DESC
      `

    const { rows } = await client.query<RevenueMetrics>(sql, [
      searchStartDate,
      searchEndDate,
    ])

    const metrics = rows.map((row) => {
      const revenue = Number(row.revenue).toFixed(2)

      return {
        date: row.date,
        revenue: Number(revenue),
      }
    })

    return metrics
  }
}

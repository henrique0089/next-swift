import { PaymentMethod, Sale } from '@app/entities/sale'
import {
  PaginateParams,
  SalesRepository,
} from '@app/repositories/sales-repository'
import dayjs from 'dayjs'
import { client } from '../connection'

interface SaleRecord {
  id: string
  total: number
  qtd: number
  payment_method: PaymentMethod
  product_id: string
  buyer_id: string
  created_at: Date
}

export class PGSalesRepository implements SalesRepository {
  async create(sale: Sale): Promise<void> {
    const {
      id,
      total,
      quantity,
      paymentMethod,
      productId,
      buyerId,
      createdAt,
    } = sale

    const query =
      'INSERT INTO sales (id, total, qtd, payment_method, product_id, buyer_id, created_at) VALUES($1, $2, $3, $4, $5, $6, $7)'

    await client.query(query, [
      id,
      total,
      quantity,
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
  }: PaginateParams): Promise<Sale[] | null> {
    const searchStartDate =
      startDate || dayjs(startDate).subtract(1, 'month').toDate()
    const searchEndDate = endDate || new Date()

    const offset = (page - 1) * limit
    const query = `SELECT * FROM sales
       WHERE created_at BETWEEN $1 AND $2
       ORDER BY created_at DESC 
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
          quantity: data.qtd,
          paymentMethod: data.payment_method,
          productId: data.product_id,
          buyerId: data.buyer_id,
          createdAt: data.created_at,
        },
        data.id,
      )

      sales.push(sale)
    }

    return sales
  }
}

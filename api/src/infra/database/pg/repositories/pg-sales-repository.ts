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
  product_name: string
  product_price: number
  product_quantity: number
  buyer_id: string
  created_at: Date
}

export class PGSalesRepository implements SalesRepository {
  async create(sale: Sale): Promise<void> {
    const {
      id,
      total,
      productQty,
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
    const query = `SELECT s.id, s.total, s.qtd, s.payment_method, s.product_id, s.buyer_id, s.created_at, p.name AS product_name, p.price AS product_price, p.quantity AS product_quantity
      FROM sales s
      JOIN products p ON s.product_id = p.id
      WHERE s.created_at BETWEEN $1 AND $2
      GROUP BY s.id, s.total, s.qtd, s.payment_method, s.product_id, s.buyer_id, s.created_at, p.name, p.price, p.quantity
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
          paymentMethod: data.payment_method,
          buyerId: data.buyer_id,
          productId: data.product_id,
          productName: data.product_name,
          productQty: data.product_quantity,
          productPrice: data.product_price,
          createdAt: data.created_at,
        },
        data.id,
      )

      sales.push(sale)
    }

    return sales
  }
}

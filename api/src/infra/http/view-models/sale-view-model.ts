import { Sale } from '@app/entities/sale'

export class SaleViewModel {
  static toHttp(sale: Sale) {
    return {
      id: sale.id,
      total: sale.total,
      product: sale.productName,
      quantiy: sale.productQty,
      paymentMethod: sale.paymentMethod,
      status: sale.status,
      customer: sale.buyerName,
    }
  }
}

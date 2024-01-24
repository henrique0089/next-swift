import { describe, expect, it } from 'vitest'
import { PaymentMethod, Sale } from '.'

describe('Role entity', () => {
  it('should be to instantiate a new Role', () => {
    const sale = new Sale({
      total: 12500,
      paymentMethod: PaymentMethod.money,
      buyerId: 'buyerId',
      productId: 'productId',
      productName: 'shoes',
      productPrice: 12580,
      productQty: 2,
    })

    expect(sale).toBeInstanceOf(Sale)
    expect(sale.total).toEqual(12500)
    expect(sale.productQty).toEqual(2)
  })
})

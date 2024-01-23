import { describe, expect, it } from 'vitest'
import { PaymentMethod, Sale } from '.'

describe('Role entity', () => {
  it('should be to instantiate a new Role', () => {
    const sale = new Sale({
      total: 12500,
      quantity: 2,
      paymentMethod: PaymentMethod.money,
      buyerId: 'buyerId',
      productId: 'productId',
    })

    expect(sale).toBeInstanceOf(Sale)
    expect(sale.total).toEqual(12500)
    expect(sale.quantity).toEqual(2)
  })
})

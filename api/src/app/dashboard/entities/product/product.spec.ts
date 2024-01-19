import { describe, expect, it } from 'vitest'
import { Product } from '.'

describe('Product Entity', () => {
  it('should be able to instantiate a new Product', () => {
    const product = new Product({
      name: 't-shirt',
      description: 't-shirt description',
      width: 56,
      height: 78,
      price: 7990,
      quantity: 23,
      weight: 258,
      categories: [],
      images: [],
      updatedAt: null,
      removedAt: null,
    })

    expect(product).toBeInstanceOf(Product)
    expect(product.id).toBeDefined()
    expect(product.name).toBe('t-shirt')
  })
})

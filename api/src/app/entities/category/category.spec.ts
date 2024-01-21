import { describe, expect, it } from 'vitest'
import { Category } from '.'

describe('Category entity', () => {
  it('should be to instantiate a new category', () => {
    const category = new Category({
      name: 'shoes',
    })

    expect(category).toBeInstanceOf(Category)
    expect(category.id).toBeDefined()
    expect(category.name).toBe('shoes')
  })
})

import { describe, expect, it } from 'vitest'
import { Role } from '.'

describe('Role entity', () => {
  it('should be to instantiate a new Role', () => {
    const role = new Role({
      name: 'editor',
    })

    expect(role).toBeInstanceOf(Role)
    expect(role.id).toBeDefined()
    expect(role.name).toBe('editor')
  })
})

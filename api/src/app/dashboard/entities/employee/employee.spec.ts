import { beforeAll, describe, expect, it } from 'vitest'
import { Employee } from '.'

let employee: Employee

beforeAll(() => {
  employee = new Employee({
    firstName: 'Jhon',
    lastName: 'doe',
    email: 'jhondoe@email.com',
    ddd: 99,
    phone: 99999999,
    avatar: 'https://github.com/henrique998.png',
    updatedAt: null,
    role: null,
  })
})

describe('Employee entity', () => {
  it('should be able to instantiate a new employee', () => {
    expect(employee).toBeInstanceOf(Employee)
    expect(employee.id).toBeDefined()
    expect(employee.firstName).toBe('Jhon')
  })

  it('should be able to set updateAt property', () => {
    employee.update()

    expect(employee.updatedAt).toBeDefined()
  })

  it('should be able to set dismissedAt property', () => {
    employee.dismiss()

    expect(employee.dismissedAt).toBeDefined()
  })
})

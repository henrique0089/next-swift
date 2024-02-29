import { faker } from '@faker-js/faker'

import { Employee, Role } from '@app/entities/employee'
import { InMemoryEmployeesRepository } from 'src/test/dashboard/repositories/in-memory-employees-repository'
import { InMemoryAuthProvider } from 'src/test/providers/in-memory-auth-provider'
import { beforeAll, describe, expect, it } from 'vitest'
import { HireEmployeeUseCase } from '.'

let inMemoryEmployeesRepository: InMemoryEmployeesRepository
let inMemoryAuthProvider: InMemoryAuthProvider
let hireEmployeeUseCase: HireEmployeeUseCase

beforeAll(() => {
  inMemoryEmployeesRepository = new InMemoryEmployeesRepository()
  inMemoryAuthProvider = new InMemoryAuthProvider()
  hireEmployeeUseCase = new HireEmployeeUseCase(
    inMemoryEmployeesRepository,
    inMemoryAuthProvider,
  )
})

describe('Hire Employee UseCase', () => {
  it('should be able to hire a new employee', async () => {
    const admin = new Employee({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      ddd: 99,
      phone: 99999999,
      avatar: 'https://github.com/henrique998.png',
      updatedAt: null,
      role: 'admin',
      externalId: 'admin-clerk-id',
    })

    await inMemoryEmployeesRepository.create(admin)

    const email = faker.internet.email()
    const requestData = {
      adminExternalId: admin.externalId,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email,
      ddd: 82,
      phone: 99999999,
      avatar: 'avatar.png',
      role: 'admin' as Role,
    }

    const { password } = await hireEmployeeUseCase.execute(requestData)

    const employee = await inMemoryEmployeesRepository.findByEmail(email)

    expect(inMemoryEmployeesRepository.employees).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: employee?.id,
        }),
      ]),
    )
    expect(password).toBeDefined()
  })

  it('should not able to hire an employee if admin not found', async () => {
    const requestData = {
      adminExternalId: 'clerk-id',
      firstName: 'John',
      lastName: 'Doe',
      email: 'jhon.Doe@gmail.com',
      ddd: 82,
      phone: 99999999,
      avatar: 'avatar.png',
      role: 'editor' as Role,
    }

    await expect(hireEmployeeUseCase.execute(requestData)).rejects.toThrow(
      'Unauthorized action. admin not found!',
    )
  })

  it('should not able to hire an employee if role not equals to admin', async () => {
    const employee = new Employee({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      ddd: 99,
      phone: 99999999,
      avatar: 'https://github.com/henrique998.png',
      updatedAt: null,
      role: 'editor',
      externalId: 'externalId-2',
    })

    await inMemoryEmployeesRepository.create(employee)

    const requestData = {
      adminExternalId: 'externalId-2',
      firstName: 'John',
      lastName: 'Doe',
      email: 'jhon.Doe@gmail.com',
      ddd: 82,
      phone: 99999999,
      avatar: 'avatar.png',
      role: 'editor' as Role,
    }

    await expect(hireEmployeeUseCase.execute(requestData)).rejects.toThrow(
      'Unauthorized action!',
    )
  })
})

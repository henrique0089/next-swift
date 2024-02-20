import { Employee, Gender, Role } from '@app/entities/employee'
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
    const requestData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      ddd: 82,
      phone: 99999999,
      avatar: 'avatar.png',
      gender: 'M' as Gender,
      role: 'admin' as Role,
    }

    const { password } = await hireEmployeeUseCase.execute(requestData)

    const employee = await inMemoryEmployeesRepository.findByEmail(
      'john.doe@example.com',
    )

    expect(inMemoryEmployeesRepository.employees[0].id).toEqual(employee?.id)
    expect(password).toBeDefined()
  })

  it('should not able to hire an employee if already has been hired', async () => {
    const existingEmployee = new Employee({
      firstName: 'Jhon',
      lastName: 'doe',
      email: 'jhondoe@email.com',
      ddd: 82,
      phone: 99999999,
      avatar: 'https://github.com/henrique998.png',
      externalId: 'externalId',
      updatedAt: null,
      gender: 'M' as Gender,
      role: 'editor' as Role,
    })

    await inMemoryEmployeesRepository.create(existingEmployee)

    const requestData = {
      firstName: 'John',
      lastName: 'Doe',
      email: existingEmployee.email,
      ddd: 82,
      phone: 99999999,
      avatar: 'avatar.png',
      gender: 'M' as Gender,
      role: 'editor' as Role,
    }

    await expect(hireEmployeeUseCase.execute(requestData)).rejects.toThrow(
      'Employee already exists!',
    )
  })
})

import { Employee } from '@app/dashboard/entities/employee'
import { InMemoryEmployeesRepository } from 'src/test/dashboard/repositories/in-memory-employees-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { GetAllEmployeesUseCase } from '.'

let inMemoryEmployeesRepository: InMemoryEmployeesRepository
let getAllEmployeesUseCase: GetAllEmployeesUseCase

beforeAll(() => {
  inMemoryEmployeesRepository = new InMemoryEmployeesRepository()
  getAllEmployeesUseCase = new GetAllEmployeesUseCase(
    inMemoryEmployeesRepository,
  )
})

describe('Get All Employees UseCase', () => {
  it('should be able to get all employees', async () => {
    const employee = new Employee({
      firstName: 'Jhon',
      lastName: 'doe',
      email: 'jhondoe@email.com',
      ddd: 99,
      phone: 99999999,
      gender: 'M',
      avatar: 'https://github.com/henrique998.png',
      updatedAt: null,
      role: null,
    })

    await inMemoryEmployeesRepository.create(employee, 'fake-role-id')

    const employees = await getAllEmployeesUseCase.execute()

    expect(employees.length).toEqual(1)
  })
})

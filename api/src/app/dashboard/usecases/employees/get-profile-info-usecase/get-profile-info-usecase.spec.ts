import { Employee } from '@app/dashboard/entities/employee'
import { InMemoryEmployeesRepository } from 'src/test/dashboard/repositories/in-memory-employees-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { GetProfileInfoUseCase } from '.'

let inMemoryEmployeesRepository: InMemoryEmployeesRepository
let getProfileInfoUseCase: GetProfileInfoUseCase

beforeAll(() => {
  inMemoryEmployeesRepository = new InMemoryEmployeesRepository()
  getProfileInfoUseCase = new GetProfileInfoUseCase(inMemoryEmployeesRepository)
})

describe('Get Profile Info UseCase', () => {
  it('should be able to get employee info', async () => {
    const employee = new Employee({
      firstName: 'Jhon',
      lastName: 'doe',
      email: 'jhondoe@email.com',
      ddd: 99,
      phone: 99999999,
      gender: 'M',
      avatar: 'avatar.png',
      updatedAt: null,
      role: null,
    })

    await inMemoryEmployeesRepository.create(employee, 'adminId')

    const result = await getProfileInfoUseCase.execute({
      employeeId: employee.id,
    })

    expect(result.employee.email).toEqual(employee.email)
  })

  it('should not be able to get employee info that not exists', async () => {
    await expect(
      getProfileInfoUseCase.execute({ employeeId: 'fake-employeeId' }),
    ).rejects.toThrow('employee not found!')
  })
})

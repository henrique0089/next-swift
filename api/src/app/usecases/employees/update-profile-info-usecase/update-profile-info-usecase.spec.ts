import { Employee } from '@app/entities/employee'
import { InMemoryEmployeesRepository } from 'src/test/dashboard/repositories/in-memory-employees-repository'
import { InMemoryAuthProvider } from 'src/test/providers/in-memory-auth-provider'
import { beforeAll, describe, expect, it } from 'vitest'
import { UpdateProfileInfoUseCase } from '.'

let employeesRepo: InMemoryEmployeesRepository
let authProvider: InMemoryAuthProvider
let sut: UpdateProfileInfoUseCase

beforeAll(() => {
  employeesRepo = new InMemoryEmployeesRepository()
  authProvider = new InMemoryAuthProvider()
  sut = new UpdateProfileInfoUseCase(employeesRepo, authProvider)
})

describe('Get Profile Info UseCase', () => {
  it('should be able to update profile info', async () => {
    const employee = new Employee({
      firstName: 'Jhon',
      lastName: 'Doe',
      email: 'jhondoe@gmail.com',
      avatar: 'avatar.png',
      ddd: 82,
      phone: 99999999,
      role: 'admin',
      gender: 'M',
      externalId: 'admin-external-id',
    })

    employeesRepo.create(employee)

    await sut.execute({
      externalId: employee.externalId,
      firstName: 'Henrique',
    })

    expect(employeesRepo.employees[0].firstName).toEqual('Henrique')
  })

  it('should not be able to update profile info if employee not exists', async () => {
    await expect(() =>
      sut.execute({
        externalId: 'non-existing-externalId',
      }),
    ).rejects.toThrow('Employee not found!')
  })
})

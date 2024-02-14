import { Employee } from '@app/entities/employee'
import { InMemoryEmployeesRepository } from 'src/test/dashboard/repositories/in-memory-employees-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { GetProfileInfoUseCase } from '.'

let employeesRepo: InMemoryEmployeesRepository
let getProfileInfoUseCase: GetProfileInfoUseCase

beforeAll(() => {
  employeesRepo = new InMemoryEmployeesRepository()
  getProfileInfoUseCase = new GetProfileInfoUseCase(employeesRepo)
})

describe('Get Profile Info UseCase', () => {
  it('should be able to get profile info', async () => {
    const employee = new Employee({
      firstName: 'Jhon',
      lastName: 'Doe',
      email: 'jhondoe@gmail.com',
      avatar: 'avatar.png',
      ddd: 82,
      phone: 99999999,
      role: 'admin',
      gender: 'M',
    })

    employeesRepo.create(employee)

    const res = await getProfileInfoUseCase.execute({
      email: 'jhondoe@gmail.com',
    })

    expect(res.employee.firstName).toEqual('Jhon')
  })

  it('should not be able to get profile info if employee not exists', async () => {
    await expect(() =>
      getProfileInfoUseCase.execute({
        email: 'henrique@gmail.com',
      }),
    ).rejects.toThrow('Employee not found!')
  })
})

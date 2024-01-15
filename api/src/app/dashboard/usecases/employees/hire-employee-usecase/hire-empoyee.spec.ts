import { Employee } from '@app/dashboard/entities/employee'
import { Role } from '@app/dashboard/entities/role'
import { InMemoryEmployeesRepository } from 'src/test/dashboard/repositories/in-memory-employees-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { HireEmployeeUseCase } from '.'

let inMemoryEmployeesRepository: InMemoryEmployeesRepository
let hireEmployeeUseCase: HireEmployeeUseCase

beforeAll(() => {
  inMemoryEmployeesRepository = new InMemoryEmployeesRepository()
  hireEmployeeUseCase = new HireEmployeeUseCase(inMemoryEmployeesRepository)
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
      roleId: 'role_id',
    }

    await hireEmployeeUseCase.execute(requestData)

    const employee = await inMemoryEmployeesRepository.findByEmail(
      'john.doe@example.com',
    )

    expect(inMemoryEmployeesRepository.employees[0].id).toEqual(employee?.id)
  })

  it('should not able to hire an employee if already has been hired', async () => {
    const existingEmployee = new Employee({
      firstName: 'Jhon',
      lastName: 'doe',
      email: 'jhondoe@email.com',
      ddd: 82,
      phone: 99999999,
      avatar: 'https://github.com/henrique998.png',
      updatedAt: null,
      role: new Role(
        {
          name: 'fake-role',
        },
        'fake-id',
      ),
    })

    await inMemoryEmployeesRepository.create(
      existingEmployee,
      'fake-employee-id',
    )

    const requestData = {
      firstName: 'John',
      lastName: 'Doe',
      email: existingEmployee.email,
      ddd: 82,
      phone: 99999999,
      avatar: 'avatar.png',
      roleId: 'role_id',
    }

    await expect(hireEmployeeUseCase.execute(requestData)).rejects.toThrow(
      'Employee already exists!',
    )
  })
})

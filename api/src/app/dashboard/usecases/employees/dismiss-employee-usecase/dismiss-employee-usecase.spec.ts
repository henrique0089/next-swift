import { Employee } from '@app/dashboard/entities/employee'
import { Role } from '@app/dashboard/entities/role'
import { InMemoryEmployeesRepository } from 'src/test/dashboard/repositories/in-memory-employees-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { DismissEmployeeUseCase } from '.'

let inMemoryEmployeesRepository: InMemoryEmployeesRepository
let dismissEmployeeUseCase: DismissEmployeeUseCase

beforeAll(() => {
  inMemoryEmployeesRepository = new InMemoryEmployeesRepository()
  dismissEmployeeUseCase = new DismissEmployeeUseCase(
    inMemoryEmployeesRepository,
  )
})

describe('Dismiss Employee UseCase', () => {
  it('should be able to dismiss an employee', async () => {
    const role = new Role({
      name: 'admin',
    })

    const admin = new Employee({
      firstName: 'Admin',
      lastName: 'admin',
      email: 'admin@email.com',
      ddd: 88,
      phone: 888888888,
      gender: 'M',
      avatar: 'avatar.png',
      updatedAt: null,
      role,
    })
    const editor = new Employee({
      firstName: 'Jhon',
      lastName: 'doe',
      email: 'jhondoe@email.com',
      ddd: 99,
      phone: 999999999,
      gender: 'F',
      avatar: 'avatar.png',
      updatedAt: null,
      role: null,
    })

    await inMemoryEmployeesRepository.create(admin, 'admin')
    await inMemoryEmployeesRepository.create(editor, 'editor')

    await dismissEmployeeUseCase.execute({
      adminId: admin.id,
      employeeId: editor.id,
    })

    const employee = await inMemoryEmployeesRepository.findById(editor.id)

    expect(employee?.dismissedAt).toBeDefined()
  })

  it('should not be able to dismiss an employee if admin not exists', async () => {
    const nonExtingAdmin = new Employee({
      firstName: 'Admin',
      lastName: 'admin',
      email: 'admin@email.com',
      ddd: 88,
      phone: 888888888,
      gender: 'F',
      avatar: 'avatar.png',
      updatedAt: null,
      role: null,
    })

    const editor = new Employee({
      firstName: 'Jhon',
      lastName: 'doe',
      email: 'jhondoe@email.com',
      ddd: 99,
      phone: 999999999,
      gender: 'F',
      avatar: 'avatar.png',
      updatedAt: null,
      role: null,
    })

    await inMemoryEmployeesRepository.create(editor, 'editor')

    await expect(
      dismissEmployeeUseCase.execute({
        adminId: nonExtingAdmin.id,
        employeeId: editor.id,
      }),
    ).rejects.toThrow('Unauthorized action!')
  })

  it('should not be able to dismiss an employee if admin-employee role is not equals to admin', async () => {
    const role = new Role({
      name: 'viewer',
    })

    const admin = new Employee({
      firstName: 'Admin',
      lastName: 'admin',
      email: 'admin@email.com',
      ddd: 88,
      phone: 888888888,
      gender: 'F',
      avatar: 'avatar.png',
      updatedAt: null,
      role,
    })

    const editor = new Employee({
      firstName: 'Jhon',
      lastName: 'doe',
      email: 'jhondoe@email.com',
      ddd: 99,
      phone: 999999999,
      gender: 'M',
      avatar: 'avatar.png',
      updatedAt: null,
      role: null,
    })

    await inMemoryEmployeesRepository.create(admin, 'admin')
    await inMemoryEmployeesRepository.create(editor, 'editor')

    await expect(
      dismissEmployeeUseCase.execute({
        adminId: admin.id,
        employeeId: editor.id,
      }),
    ).rejects.toThrow('Unauthorized action!')
  })
})

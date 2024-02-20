import { Employee } from '@app/entities/employee'
import { InMemoryEmployeesRepository } from 'src/test/dashboard/repositories/in-memory-employees-repository'
import { InMemoryAuthProvider } from 'src/test/providers/in-memory-auth-provider'
import { beforeAll, describe, expect, it } from 'vitest'
import { DismissEmployeeUseCase } from '.'

let inMemoryEmployeesRepository: InMemoryEmployeesRepository
let inMemoryAuthProvider: InMemoryAuthProvider
let dismissEmployeeUseCase: DismissEmployeeUseCase

beforeAll(() => {
  inMemoryEmployeesRepository = new InMemoryEmployeesRepository()
  inMemoryAuthProvider = new InMemoryAuthProvider()
  dismissEmployeeUseCase = new DismissEmployeeUseCase(
    inMemoryEmployeesRepository,
    inMemoryAuthProvider,
  )
})

describe('Dismiss Employee UseCase', () => {
  it('should be able to dismiss an employee', async () => {
    const admin = new Employee({
      firstName: 'Admin',
      lastName: 'admin',
      email: 'admin@email.com',
      ddd: 88,
      phone: 888888888,
      gender: 'M',
      role: 'admin',
      avatar: 'avatar.png',
      externalId: 'admin-clerk-id',
      updatedAt: null,
    })

    const editor = new Employee({
      firstName: 'Jhon',
      lastName: 'doe',
      email: 'jhondoe@email.com',
      ddd: 99,
      phone: 999999999,
      gender: 'F',
      role: null,
      avatar: 'avatar.png',
      externalId: 'editor-clerk-id',
      updatedAt: null,
    })

    await inMemoryEmployeesRepository.create(admin)
    await inMemoryEmployeesRepository.create(editor)

    await dismissEmployeeUseCase.execute({
      externalAdminId: admin.externalId,
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
      role: null,
      avatar: 'avatar.png',
      externalId: 'clerk-id',
      updatedAt: null,
    })

    const editor = new Employee({
      firstName: 'Jhon',
      lastName: 'doe',
      email: 'jhondoe@email.com',
      ddd: 99,
      phone: 999999999,
      gender: 'F',
      role: null,
      avatar: 'avatar.png',
      externalId: 'fake-clerk-id',
      updatedAt: null,
    })

    await inMemoryEmployeesRepository.create(editor)

    await expect(
      dismissEmployeeUseCase.execute({
        externalAdminId: nonExtingAdmin.externalId,
        employeeId: editor.id,
      }),
    ).rejects.toThrow('Unauthorized action!')
  })

  it('should not be able to dismiss an employee if admin-employee role is not equals to admin', async () => {
    const admin = new Employee({
      firstName: 'Admin',
      lastName: 'admin',
      email: 'admin@email.com',
      ddd: 88,
      phone: 888888888,
      gender: 'F',
      role: 'editor',
      avatar: 'avatar.png',
      externalId: 'clerk-id',
      updatedAt: null,
    })

    const editor = new Employee({
      firstName: 'Jhon',
      lastName: 'doe',
      email: 'jhondoe@email.com',
      ddd: 99,
      phone: 999999999,
      gender: 'M',
      role: null,
      avatar: 'avatar.png',
      externalId: 'fake-clerk-id',
      updatedAt: null,
    })

    await inMemoryEmployeesRepository.create(admin)
    await inMemoryEmployeesRepository.create(editor)

    await expect(
      dismissEmployeeUseCase.execute({
        externalAdminId: admin.externalId,
        employeeId: editor.id,
      }),
    ).rejects.toThrow('Unauthorized action!')
  })
})

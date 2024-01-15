import { InMemoryRolesRepository } from 'src/test/dashboard/repositories/in-memory-roles-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { AddRoleUseCase } from '.'

let inMemoryRolesRepository: InMemoryRolesRepository
let addRoleUseCase: AddRoleUseCase

beforeAll(() => {
  inMemoryRolesRepository = new InMemoryRolesRepository()
  addRoleUseCase = new AddRoleUseCase(inMemoryRolesRepository)
})

describe('Add Role UseCase', () => {
  it('should be to add a new role', async () => {
    await addRoleUseCase.execute('viewer')

    const role = await inMemoryRolesRepository.findByName('viewer')

    expect(inMemoryRolesRepository.roles[0].id).toEqual(role?.id)
    expect(inMemoryRolesRepository.roles[0].name).toEqual(role?.name)
  })

  it('should not be to add an role if already exists', async () => {
    await addRoleUseCase.execute('admin')

    await expect(addRoleUseCase.execute('admin')).rejects.toThrow(
      'role already exists!',
    )
  })
})

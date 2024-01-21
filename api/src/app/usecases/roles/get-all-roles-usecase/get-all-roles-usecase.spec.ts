import { Role } from '@app/entities/role'
import { InMemoryRolesRepository } from 'src/test/dashboard/repositories/in-memory-roles-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { GetAllRolesUseCase } from '.'

let inMemoryRolesRepository: InMemoryRolesRepository
let getAllRolesUseCase: GetAllRolesUseCase

beforeAll(() => {
  inMemoryRolesRepository = new InMemoryRolesRepository()
  getAllRolesUseCase = new GetAllRolesUseCase(inMemoryRolesRepository)
})

describe('Get All Roles UseCase', () => {
  it('should be able to get all roles', async () => {
    const role = new Role({
      name: 'editor',
    })

    await inMemoryRolesRepository.create(role)

    const { roles } = await getAllRolesUseCase.execute()

    expect(roles.length).toEqual(1)
    expect(roles[0].id).toEqual(role.id)
  })
})

export interface RolesRepository {
  findAll(): Promise<string[]>
  findByName(name: string): Promise<string | null>
  create(role: string): Promise<void>
}

import { Supplier } from '@app/entities/supplier'

export type PaginateParams = {
  page: number
  limit: number
}

export interface SuppliersRepository {
  findById(supplierId: string): Promise<Supplier | null>
  findByEmail(email: string): Promise<Supplier | null>
  paginate(params: PaginateParams): Promise<Supplier[]>
  create(supplier: Supplier): Promise<void>
  save(supplier: Supplier): Promise<void>
  delete(supplierId: string): Promise<void>
}

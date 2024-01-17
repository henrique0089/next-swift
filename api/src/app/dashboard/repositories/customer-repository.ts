import { Customer } from '@app/dashboard/entities/customer'

export type PaginateParams = {
  page: number
  limit: number
}

export interface CustomersRepository {
  findById(customerId: string): Promise<Customer | null>
  findByEmail(email: string): Promise<Customer | null>
  paginate(params: PaginateParams): Promise<Customer[]>
  create(customer: Customer): Promise<void>
  save(customer: Customer): Promise<void>
}

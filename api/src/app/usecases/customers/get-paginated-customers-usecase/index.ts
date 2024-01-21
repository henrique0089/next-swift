import { Customer } from '@app/entities/customer'
import { CustomersRepository } from '@app/repositories/customer-repository'

interface Request {
  page?: number
  limit?: number
}

interface Response {
  customers: Customer[]
}

export class GetPaginatedCustomersUseCase {
  constructor(private customersRepo: CustomersRepository) {}

  async execute({ page = 1, limit = 10 }: Request): Promise<Response> {
    const customers = await this.customersRepo.paginate({ page, limit })

    return {
      customers,
    }
  }
}

import { Customer } from '@app/entities/customer'
import { CustomersRepository } from '@app/repositories/customer-repository'

interface Request {
  customer?: string
  email?: string
  document?: string
  startDate?: Date
  endDate?: Date
  page?: number
  limit?: number
}

interface Response {
  customers: Customer[]
  totalCount: number
}

export class GetPaginatedCustomersUseCase {
  constructor(private customersRepo: CustomersRepository) {}

  async execute({
    customer,
    email,
    document,
    startDate,
    endDate,
    page,
    limit,
  }: Request): Promise<Response> {
    const { customers, totalCount } = await this.customersRepo.paginate({
      customer,
      email,
      document,
      startDate,
      endDate,
      page,
      limit,
    })

    return {
      customers,
      totalCount,
    }
  }
}

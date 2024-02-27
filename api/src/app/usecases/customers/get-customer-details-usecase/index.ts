import { Customer } from '@app/entities/customer'
import { AppError } from '@app/errors/app-error'
import { CustomersRepository } from '@app/repositories/customer-repository'

interface Request {
  customerId: string
}

interface Response {
  customer: Customer
}

export class GetCustomerDetailsUseCase {
  constructor(private customersRepo: CustomersRepository) {}

  async execute({ customerId }: Request): Promise<Response> {
    const customer = await this.customersRepo.findById(customerId)

    if (!customer) {
      throw new AppError('Customer not found!', 404)
    }

    return {
      customer,
    }
  }
}

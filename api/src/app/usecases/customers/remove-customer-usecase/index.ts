import { AppError } from '@app/errors/app-error'
import { CustomersRepository } from '@app/repositories/customer-repository'

interface Request {
  customerId: string
}

type Response = void

export class RemoveCustomerUseCase {
  constructor(private customersRepo: CustomersRepository) {}

  async execute({ customerId }: Request): Promise<Response> {
    const customer = await this.customersRepo.findById(customerId)

    if (!customer) {
      throw new AppError('Customer not found!')
    }

    await this.customersRepo.delete(customerId)
  }
}

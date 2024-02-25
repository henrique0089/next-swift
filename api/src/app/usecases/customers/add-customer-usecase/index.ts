import { Customer } from '@app/entities/customer'
import { Address } from '@app/entities/customer/address'
import { AppError } from '@app/errors/app-error'
import { CustomersRepository } from '@app/repositories/customer-repository'

interface Request {
  name: string
  email: string
  document: string
  ddd: number
  phone: number
  address: {
    street: string
    number: number
    complement?: string | null
    city: string
    state: string
    postalCode: string
  }
}

type Response = void

export class AddCustomerUseCase {
  constructor(private customersRepo: CustomersRepository) {}

  async execute(data: Request): Promise<Response> {
    const { name, email, document, ddd, phone, address } = data

    const customerAlreadyExists = await this.customersRepo.findByEmail(email)

    if (customerAlreadyExists) {
      throw new AppError('Customer Already Exists!')
    }

    const customer = new Customer({
      name,
      email,
      document,
      ddd,
      phone,
      address: new Address({
        ...address,
      }),
    })

    await this.customersRepo.create(customer)
  }
}

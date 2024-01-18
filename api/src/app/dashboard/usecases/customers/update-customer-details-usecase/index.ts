import { Address } from '@app/dashboard/entities/customer/address'
import { AppError } from '@app/dashboard/errors/app-error'
import { CustomersRepository } from '@app/dashboard/repositories/customer-repository'

interface Request {
  customerId: string
  name?: string
  email?: string
  ddd?: number
  phone?: number
  postalCode?: string
  street?: string
  number?: number
  complement?: string
  city?: string
  state?: string
}

type Response = void

export class UpdateCustomerDetailsUseCase {
  constructor(private customersRepo: CustomersRepository) {}

  async execute({ customerId, ...data }: Request): Promise<Response> {
    const customer = await this.customersRepo.findById(customerId)

    if (!customer) {
      throw new AppError('Customer not found!')
    }

    customer.name = data.name ?? customer.name
    customer.email = data.email ?? customer.email
    customer.ddd = data.ddd ?? customer.ddd
    customer.phone = data.phone ?? customer.phone
    customer.address = new Address({
      postalCode: data.postalCode ?? customer.address.postalCode,
      street: data.street ?? customer.address.street,
      number: data.number ?? customer.address.number,
      city: data.city ?? customer.address.city,
      state: data.state ?? customer.address.state,
      complement: data.complement ?? customer.address.complement,
    })
    customer.update()

    await this.customersRepo.save(customer)
  }
}

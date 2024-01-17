import { Customer } from '@app/dashboard/entities/customer'
import { Address } from '@app/dashboard/entities/customer/address'
import { AppError } from '@app/dashboard/errors/app-error'
import { CustomersRepository } from '@app/dashboard/repositories/customer-repository'

interface Request {
  name: string
  email: string
  cpf: string
  ddd: number
  phone: number
  addresses: {
    street: string
    number: number
    complement?: string | null
    city: string
    state: string
    postalCode: string
  }[]
}

type Response = void

export class AddCustomerUseCase {
  constructor(private customersRepo: CustomersRepository) {}

  async execute(data: Request): Promise<Response> {
    const { name, email, cpf, ddd, phone, addresses } = data

    const customerAlreadyExists = await this.customersRepo.findByEmail(email)

    if (customerAlreadyExists) {
      throw new AppError('Customer Already Exists!')
    }

    const customerAddresses = addresses.map((address) => {
      return new Address({
        ...address,
      })
    })

    const customer = new Customer({
      name,
      email,
      cpf,
      ddd,
      phone,
      addresses: customerAddresses,
    })

    await this.customersRepo.create(customer)
  }
}

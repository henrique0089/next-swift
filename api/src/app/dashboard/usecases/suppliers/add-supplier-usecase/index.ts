import { Supplier } from '@app/dashboard/entities/supplier'
import { Address } from '@app/dashboard/entities/supplier/address'
import { AppError } from '@app/dashboard/errors/app-error'
import { SuppliersRepository } from '@app/dashboard/repositories/suppliers-repository'

interface Request {
  name: string
  email: string
  cnpj: string
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

export class AddSupplierUseCase {
  constructor(private suppliersRepo: SuppliersRepository) {}

  async execute(data: Request): Promise<Response> {
    const { name, email, cnpj, ddd, phone, addresses } = data

    const supplierAlreadyExists = await this.suppliersRepo.findByEmail(email)

    if (supplierAlreadyExists) {
      throw new AppError('Supplier Already Exists!')
    }

    const supplier = new Supplier({
      name,
      email,
      cnpj,
      ddd,
      phone,
      addresses: addresses.map((address) => {
        return new Address({
          ...address,
        })
      }),
    })

    await this.suppliersRepo.create(supplier)
  }
}

import { AppError } from '@app/dashboard/errors/app-error'
import { SuppliersRepository } from '@app/dashboard/repositories/suppliers-repository'

interface Request {
  supplierId: string
  name?: string
  email?: string
  ddd?: number
  phone?: number
}

type Response = void

export class UpdateSupplierDetailsUseCase {
  constructor(private suppliersRepo: SuppliersRepository) {}

  async execute({ supplierId, ...data }: Request): Promise<Response> {
    const Supplier = await this.suppliersRepo.findById(supplierId)

    if (!Supplier) {
      throw new AppError('Supplier not found!')
    }

    Supplier.name = data.name ?? Supplier.name
    Supplier.email = data.email ?? Supplier.email
    Supplier.ddd = data.ddd ?? Supplier.ddd
    Supplier.phone = data.phone ?? Supplier.phone
    Supplier.update()

    await this.suppliersRepo.save(Supplier)
  }
}

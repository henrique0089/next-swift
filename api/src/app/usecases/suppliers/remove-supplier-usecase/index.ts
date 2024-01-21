import { AppError } from '@app/errors/app-error'
import { SuppliersRepository } from '@app/repositories/suppliers-repository'

interface Request {
  supplierId: string
}

type Response = void

export class RemoveSupplierUseCase {
  constructor(private suppliersRepo: SuppliersRepository) {}

  async execute({ supplierId }: Request): Promise<Response> {
    const Supplier = await this.suppliersRepo.findById(supplierId)

    if (!Supplier) {
      throw new AppError('supplier not found!')
    }

    await this.suppliersRepo.delete(supplierId)
  }
}

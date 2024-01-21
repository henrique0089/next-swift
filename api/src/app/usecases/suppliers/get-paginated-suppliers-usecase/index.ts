import { Supplier } from '@app/entities/supplier'
import { SuppliersRepository } from '@app/repositories/suppliers-repository'

interface Request {
  page?: number
  limit?: number
}

interface Response {
  suppliers: Supplier[]
}

export class GetPaginatedSuppliersUseCase {
  constructor(private suppliersRepo: SuppliersRepository) {}

  async execute({ page = 1, limit = 10 }: Request): Promise<Response> {
    const suppliers = await this.suppliersRepo.paginate({ page, limit })

    return {
      suppliers,
    }
  }
}

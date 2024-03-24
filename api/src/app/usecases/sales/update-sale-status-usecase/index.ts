import { PaymentStatus } from '@app/entities/sale'
import { AppError } from '@app/errors/app-error'
import { SalesRepository } from '@app/repositories/sales-repository'

interface Request {
  saleId: string
  status: PaymentStatus
}

type Response = void

export class UpdateSaleStatusUseCase {
  constructor(private salesRepo: SalesRepository) {}

  async execute({ saleId, status }: Request): Promise<Response> {
    const saleExists = await this.salesRepo.findById(saleId)

    if (!saleExists) {
      throw new AppError('Sale not found!', 404)
    }

    saleExists.status = status

    await this.salesRepo.update(saleExists)
  }
}

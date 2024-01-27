import { PaymentMethod, PaymentStatus, Sale } from '@app/entities/sale'
import { SalesRepository } from '@app/repositories/sales-repository'

interface Request {
  startDate?: Date
  endDate?: Date
  search?: string
  paymentMethod?: PaymentMethod
  status?: PaymentStatus
  limit?: number
  page?: number
}

interface Response {
  sales: Sale[]
}

export class GetPaginatedSalesUseCase {
  constructor(private salesRepo: SalesRepository) {}

  async execute(params: Request): Promise<Response> {
    const sales = await this.salesRepo.paginate(params)

    return { sales }
  }
}

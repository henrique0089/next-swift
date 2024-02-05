import { Sale } from '@app/entities/sale'
import { SalesRepository } from '@app/repositories/sales-repository'

interface Response {
  sales: Sale[]
}

export class GetRecentSalesUseCase {
  constructor(private salesRepo: SalesRepository) {}

  async execute(): Promise<Response> {
    const sales = await this.salesRepo.getRecent()

    return {
      sales,
    }
  }
}

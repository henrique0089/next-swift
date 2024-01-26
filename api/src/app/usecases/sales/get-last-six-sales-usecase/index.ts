import { Sale } from '@app/entities/sale'
import { SalesRepository } from '@app/repositories/sales-repository'

interface Response {
  sales: Sale[]
}

export class GetLastSixSalesUseCase {
  constructor(private salesRepo: SalesRepository) {}

  async execute(): Promise<Response> {
    const sales = await this.salesRepo.getLastSix()

    return {
      sales,
    }
  }
}

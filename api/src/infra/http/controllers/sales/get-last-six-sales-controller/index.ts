import { GetLastSixSalesUseCase } from '@app/usecases/sales/get-last-six-sales-usecase'
import { PGSalesRepository } from '@infra/database/pg/repositories/pg-sales-repository'
import { SaleViewModel } from '@infra/http/view-models/sale-view-model'
import { Request, Response } from 'express'

export class GetLastSixSalesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const salesRepo = new PGSalesRepository()
    const getLastSixSalesUseCase = new GetLastSixSalesUseCase(salesRepo)

    const result = await getLastSixSalesUseCase.execute()

    const sales = result.sales.map(SaleViewModel.toHttp)

    return res.json({ sales })
  }
}

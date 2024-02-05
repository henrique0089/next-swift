import { GetRecentSalesUseCase } from '@app/usecases/sales/get-recent-sales-usecase'
import { PGSalesRepository } from '@infra/database/pg/repositories/pg-sales-repository'
import { SaleViewModel } from '@infra/http/view-models/sale-view-model'
import { Request, Response } from 'express'

export class GetRecentSalesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const salesRepo = new PGSalesRepository()
    const getRecentSalesUseCase = new GetRecentSalesUseCase(salesRepo)

    const result = await getRecentSalesUseCase.execute()

    const sales = result.sales.map(SaleViewModel.toHttp)

    return res.json({ sales })
  }
}

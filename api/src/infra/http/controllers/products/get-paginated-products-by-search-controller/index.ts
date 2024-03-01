import { GetPaginatedProductsBySearchUseCase } from '@app/usecases/products/get-paginated-products-by-search-usecase'
import { PGProductsRepository } from '@infra/database/pg/repositories/pg-products-repository'
import { ProductViewModel } from '@infra/http/view-models/product-view-model'
import { Request, Response } from 'express'
import { z } from 'zod'

const querySchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  search: z.string().optional(),
  categories: z.string().array().optional(),
  page: z.coerce.number().optional(),
})

export class GetPaginatedProductsBySearchController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { startDate, endDate, search, categories, page } = querySchema.parse(
      req.query,
    )

    const productsRepo = new PGProductsRepository()
    const getPaginatedProductsBySearchUseCase =
      new GetPaginatedProductsBySearchUseCase(productsRepo)

    const result = await getPaginatedProductsBySearchUseCase.execute({
      startDate,
      endDate,
      search,
      categories,
      page,
    })

    const products = result.products.map(ProductViewModel.toHttp)

    return res.send({ products })
  }
}

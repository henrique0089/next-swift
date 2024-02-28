import { SearchCategoriesUseCase } from '@app/usecases/categories/search-categories-usecase'
import { PGCategoriesRepository } from '@infra/database/pg/repositories/pg-categories-repository'
import { CategoryViewModel } from '@infra/http/view-models/category-view-model'
import { Request, Response } from 'express'
import { z } from 'zod'

const querySchema = z.object({
  search: z.string(),
  limit: z.coerce.number().optional(),
  page: z.coerce.number().optional(),
})

export class SearchCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { search, limit, page } = querySchema.parse(req.query)

    const categoriesRepo = new PGCategoriesRepository()
    const searchCategoriesUseCase = new SearchCategoriesUseCase(categoriesRepo)

    const result = await searchCategoriesUseCase.execute({
      search,
      limit,
      page,
    })

    const categories = result.categories.map(CategoryViewModel.toHttp)

    return res.json({ categories })
  }
}

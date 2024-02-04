import { GetAllCategoriesUseCase } from '@app/usecases/categories/get-all-categories-usecase'
import { PGCategoriesRepository } from '@infra/database/pg/repositories/pg-categories-repository'
import { CategoryViewModel } from '@infra/http/view-models/category-view-model'
import { Request, Response } from 'express'

export class GetAllCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const categoriesRepo = new PGCategoriesRepository()
    const getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoriesRepo)

    const result = await getAllCategoriesUseCase.execute()

    const categories = result.categories.map(CategoryViewModel.toHttp)

    return res.json({ categories })
  }
}

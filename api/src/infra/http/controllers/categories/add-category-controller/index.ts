import { AddCategoryUseCase } from '@app/usecases/categories/add-category-usecase'
import { PGCategoriesRepository } from '@infra/database/pg/repositories/pg-categories-repository'
import { Request, Response } from 'express'
import { z } from 'zod'

const bodySchema = z.object({
  name: z.string(),
})

export class AddCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = bodySchema.parse(req.body)

    const categoriesRepo = new PGCategoriesRepository()
    const addCategoryUseCase = new AddCategoryUseCase(categoriesRepo)

    await addCategoryUseCase.execute({ name })

    return res.send()
  }
}

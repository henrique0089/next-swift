import { AddCategoryUseCase } from '@app/dashboard/usecases/categories/add-category-usecase'
import { PGCategoriesRepository } from '@infra/database/pg/dashboard/repositories/pg-categories-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const bodySchema = z.object({
  name: z.string(),
})

export class AddCategoryController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<FastifyReply> {
    const { name } = bodySchema.parse(req.body)

    const categoriesRepo = new PGCategoriesRepository()
    const addCategoryUseCase = new AddCategoryUseCase(categoriesRepo)

    await addCategoryUseCase.execute({ name })

    return rep.send()
  }
}

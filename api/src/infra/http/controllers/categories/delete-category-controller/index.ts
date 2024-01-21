import { DeleteCategoryUseCase } from '@app/usecases/categories/delete-category-usecase'
import { PGCategoriesRepository } from '@infra/database/pg/repositories/pg-categories-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const paramsSchema = z.object({
  categoryId: z.string(),
})

export class DeleteCategoryController {
  async execute(req: FastifyRequest, rep: FastifyReply): Promise<FastifyReply> {
    const { categoryId } = paramsSchema.parse(req.params)

    const categoriesRepo = new PGCategoriesRepository()
    const deleteCategoryUseCase = new DeleteCategoryUseCase(categoriesRepo)

    await deleteCategoryUseCase.execute({ categoryId })

    return rep.status(204).send()
  }
}

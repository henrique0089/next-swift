import { GetAllCategoriesUseCase } from '@app/dashboard/usecases/categories/get-all-categories-usecase'
import { PGCategoriesRepository } from '@infra/database/pg/dashboard/repositories/pg-categories-repository'
import { CategoryViewModel } from '@infra/http/view-models/category-view-model'
import { FastifyReply, FastifyRequest } from 'fastify'

export class GetAllCategoriesController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<FastifyReply> {
    const categoriesRepo = new PGCategoriesRepository()
    const getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoriesRepo)

    const result = await getAllCategoriesUseCase.execute()

    const categories = result.categories.map(CategoryViewModel.toHttp)

    return rep.send({ categories })
  }
}

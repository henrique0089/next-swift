import { AddCategoryController } from '@infra/http/controllers/dashboard/categories/add-category-controller'
import { DeleteCategoryController } from '@infra/http/controllers/dashboard/categories/delete-category-controller'
import { FastifyInstance } from 'fastify'

const addCategoryController = new AddCategoryController()
const deleteCategoryController = new DeleteCategoryController()

export async function categoriesRoutes(app: FastifyInstance) {
  app.post('/categories', addCategoryController.handle)
  app.delete('/categories/:categoryId/delete', deleteCategoryController.execute)
}

import { AddCategoryController } from '@infra/http/controllers/categories/add-category-controller'
import { DeleteCategoryController } from '@infra/http/controllers/categories/delete-category-controller'
import { GetAllCategoriesController } from '@infra/http/controllers/categories/get-all-categories-controller'
import { FastifyInstance } from 'fastify'

const getAllCategoriesController = new GetAllCategoriesController()
const addCategoryController = new AddCategoryController()
const deleteCategoryController = new DeleteCategoryController()

export async function categoriesRoutes(app: FastifyInstance) {
  app.get('/categories', getAllCategoriesController.handle)
  app.post('/categories', addCategoryController.handle)
  app.delete('/categories/:categoryId/delete', deleteCategoryController.execute)
}

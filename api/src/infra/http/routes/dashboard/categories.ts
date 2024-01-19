import { AddCategoryController } from '@infra/http/controllers/dashboard/categories/add-category-controller'
import { FastifyInstance } from 'fastify'

const addCategoryController = new AddCategoryController()

export async function categoriesRoutes(app: FastifyInstance) {
  app.post('/categories', addCategoryController.handle)
}

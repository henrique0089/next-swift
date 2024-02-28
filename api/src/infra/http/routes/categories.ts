import { AddCategoryController } from '@infra/http/controllers/categories/add-category-controller'
import { DeleteCategoryController } from '@infra/http/controllers/categories/delete-category-controller'
import { GetAllCategoriesController } from '@infra/http/controllers/categories/get-all-categories-controller'
import { Router } from 'express'
import { SearchCategoriesController } from '../controllers/categories/search-categories-controller'
import { ClerkExpressRequireAuth } from '../middlewares/clerk-require-auth'

const getAllCategoriesController = new GetAllCategoriesController()
const searchCategoriesController = new SearchCategoriesController()
const addCategoryController = new AddCategoryController()
const deleteCategoryController = new DeleteCategoryController()

const categoriesRouter = Router()

categoriesRouter.get(
  '/',
  ClerkExpressRequireAuth(),
  getAllCategoriesController.handle,
)

categoriesRouter.get(
  '/search',
  ClerkExpressRequireAuth(),
  searchCategoriesController.handle,
)

categoriesRouter.post(
  '/',
  ClerkExpressRequireAuth(),
  addCategoryController.handle,
)
categoriesRouter.delete(
  '/:categoryId/delete',
  ClerkExpressRequireAuth(),
  deleteCategoryController.execute,
)

export { categoriesRouter as categoriesRoutes }

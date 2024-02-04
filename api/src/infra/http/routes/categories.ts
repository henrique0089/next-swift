import { AddCategoryController } from '@infra/http/controllers/categories/add-category-controller'
import { DeleteCategoryController } from '@infra/http/controllers/categories/delete-category-controller'
import { GetAllCategoriesController } from '@infra/http/controllers/categories/get-all-categories-controller'
import { Router } from 'express'

const getAllCategoriesController = new GetAllCategoriesController()
const addCategoryController = new AddCategoryController()
const deleteCategoryController = new DeleteCategoryController()

const categoriesRouter = Router()

categoriesRouter.get('/', getAllCategoriesController.handle)
categoriesRouter.post('/', addCategoryController.handle)
categoriesRouter.delete('/:categoryId/delete', deleteCategoryController.execute)

export { categoriesRouter as categoriesRoutes }

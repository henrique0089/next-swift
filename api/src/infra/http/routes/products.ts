import { UploaderConfig } from '@infra/config/multer'
import { AddCategoriesToProductController } from '@infra/http/controllers/products/add-categories-to-product-controller'
import { AddProductController } from '@infra/http/controllers/products/add-product-controller'
import { RemoveProductController } from '@infra/http/controllers/products/remove-product-controller'
import { RemoveProductImagesController } from '@infra/http/controllers/products/remove-product-images-controller'
import { UpdateProductDetailsController } from '@infra/http/controllers/products/update-product-details-controller'
import { Router } from 'express'
import multer from 'multer'
import { GetPaginatedProductsBySearchController } from '../controllers/products/get-paginated-products-by-search-controller'
import { UploadProductImagesController } from '../controllers/products/upload-product-images-controller'
import { ClerkExpressRequireAuth } from '../middlewares/clerk-require-auth'

const addProductController = new AddProductController()
const addCategoriesToProductController = new AddCategoriesToProductController()
const updateProductDetailsController = new UpdateProductDetailsController()
const removeProductController = new RemoveProductController()
const removeProductImagesController = new RemoveProductImagesController()
const uploadProductImagesController = new UploadProductImagesController()
const getPaginatedProductsBySearchController =
  new GetPaginatedProductsBySearchController()

const upload = multer(UploaderConfig.execute('products'))

const productsRouter = Router()

productsRouter.get(
  '/',
  ClerkExpressRequireAuth(),
  getPaginatedProductsBySearchController.handle,
)

productsRouter.post(
  '/',
  ClerkExpressRequireAuth(),
  upload.array('images'),
  addProductController.handle,
)

productsRouter.post(
  '/:productId/categories/add',
  ClerkExpressRequireAuth(),
  addCategoriesToProductController.handle,
)

productsRouter.put(
  '/:productId/update',
  ClerkExpressRequireAuth(),
  updateProductDetailsController.handle,
)

productsRouter.delete(
  '/:productId/remove',
  ClerkExpressRequireAuth(),
  removeProductController.handle,
)
productsRouter.patch(
  '/:productId/images/remove',
  ClerkExpressRequireAuth(),
  removeProductImagesController.handle,
)

productsRouter.post(
  '/:productId/images/upload',
  ClerkExpressRequireAuth(),
  upload.array('images'),
  uploadProductImagesController.handle,
)

export { productsRouter as productsRoutes }

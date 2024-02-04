import { AddCategoriesToProductController } from '@infra/http/controllers/products/add-categories-to-product-controller'
import { AddProductController } from '@infra/http/controllers/products/add-product-controller'
import { RemoveProductController } from '@infra/http/controllers/products/remove-product-controller'
import { RemoveProductImagesController } from '@infra/http/controllers/products/remove-product-images-controller'
import { UpdateProductDetailsController } from '@infra/http/controllers/products/update-product-details-controller'
import { Router } from 'express'
import { GetPaginatedProductsBySearchController } from '../controllers/products/get-paginated-products-by-search-controller'
import { UploadProductImagesController } from '../controllers/products/upload-product-images-controller'

const addProductController = new AddProductController()
const addCategoriesToProductController = new AddCategoriesToProductController()
const updateProductDetailsController = new UpdateProductDetailsController()
const removeProductController = new RemoveProductController()
const removeProductImagesController = new RemoveProductImagesController()
const uploadProductImagesController = new UploadProductImagesController()
const getPaginatedProductsBySearchController =
  new GetPaginatedProductsBySearchController()

const productsRouter = Router()

productsRouter.get('/search', getPaginatedProductsBySearchController.handle)
productsRouter.post('/products', addProductController.handle)
productsRouter.post(
  '/:productId/categories/add',
  addCategoriesToProductController.handle,
)
productsRouter.put('/:productId/update', updateProductDetailsController.handle)
productsRouter.patch('/:productId/remove', removeProductController.handle)
productsRouter.patch(
  '/:productId/images/remove',
  removeProductImagesController.handle,
)
productsRouter.post(
  '/:productId/images/upload',
  uploadProductImagesController.handle,
)

export { productsRouter as productsRoutes }

import { fastifyMultipart } from '@fastify/multipart'
import { AddCategoriesToProductController } from '@infra/http/controllers/products/add-categories-to-product-controller'
import { AddProductController } from '@infra/http/controllers/products/add-product-controller'
import { RemoveProductController } from '@infra/http/controllers/products/remove-product-controller'
import { RemoveProductImagesController } from '@infra/http/controllers/products/remove-product-images-controller'
import { UpdateProductDetailsController } from '@infra/http/controllers/products/update-product-details-controller'
import { FastifyInstance } from 'fastify'
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

export async function productsRoutes(app: FastifyInstance) {
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 1_048_576 * 5, // 5mb
    },
  })

  app.get('/products/search', getPaginatedProductsBySearchController.handle)
  app.post('/products', addProductController.handle)
  app.post(
    '/products/:productId/categories/add',
    addCategoriesToProductController.handle,
  )
  app.put('/products/:productId/update', updateProductDetailsController.handle)
  app.patch('/products/:productId/remove', removeProductController.handle)
  app.patch(
    '/products/:productId/images/remove',
    removeProductImagesController.handle,
  )
  app.post(
    '/products/:productId/images/upload',
    uploadProductImagesController.handle,
  )
}

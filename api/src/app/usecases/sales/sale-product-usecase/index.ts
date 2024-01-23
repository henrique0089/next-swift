import { PaymentMethod, Sale } from '@app/entities/sale'
import { AppError } from '@app/errors/app-error'
import { NFEProvider } from '@app/providers/nfe-provider'
import { CustomersRepository } from '@app/repositories/customer-repository'
import { ProductsRepository } from '@app/repositories/products-repository'
import { SalesRepository } from '@app/repositories/sales-repository'

interface Request {
  productsQty: number
  productId: string
  buyerId: string
  paymentMethod: PaymentMethod
}

interface Response {
  nfe: Buffer
}

export class SaleProductUseCase {
  constructor(
    private salesRepo: SalesRepository,
    private productsRepo: ProductsRepository,
    private customersRepo: CustomersRepository,
    private nfeProvider: NFEProvider,
  ) {}

  async execute({
    productsQty,
    productId,
    buyerId,
    paymentMethod,
  }: Request): Promise<Response> {
    const product = await this.productsRepo.findById(productId)

    if (!product) {
      throw new AppError('product not found!')
    }

    const customerExists = await this.customersRepo.findById(buyerId)

    if (!customerExists) {
      throw new AppError('customer not found!')
    }

    if (product.quantity <= 1) {
      throw new AppError('product unavailable!')
    }

    const total = product.price * productsQty

    const sale = new Sale({
      total,
      quantity: productsQty,
      buyerId,
      paymentMethod,
      productId,
    })

    await this.salesRepo.create(sale)

    product.quantity = product.quantity - productsQty
    product.update()

    await this.productsRepo.save(product)

    const nfeBuffer = await this.nfeProvider.generateNFE({
      customerName: customerExists.name,
      product: {
        name: product.name,
        price: product.price,
        quantity: productsQty,
      },
      total,
    })

    return {
      nfe: nfeBuffer,
    }
  }
}

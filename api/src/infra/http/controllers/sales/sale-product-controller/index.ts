import { PaymentMethod } from '@app/entities/sale'
import { SaleProductUseCase } from '@app/usecases/sales/sale-product-usecase'
import { PGCustomersRepository } from '@infra/database/pg/repositories/pg-customers-repository'
import { PGProductsRepository } from '@infra/database/pg/repositories/pg-products-repository'
import { PGSalesRepository } from '@infra/database/pg/repositories/pg-sales-repository'
import { PDFKitNfeProvider } from '@infra/providers/nfe/pdfkit-nfe-provider'
import { Request, Response } from 'express'
import { z } from 'zod'

const bodySchema = z.object({
  productsQty: z.number(),
  productId: z.string().uuid(),
  buyerId: z.string().uuid(),
  paymentMethod: z.enum(['money', 'credit', 'debit']),
})

export class SaleProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { productsQty, productId, buyerId, paymentMethod } = bodySchema.parse(
      req.body,
    )

    const salesRepo = new PGSalesRepository()
    const productsRepo = new PGProductsRepository()
    const customersRepo = new PGCustomersRepository()
    const nfeProvider = new PDFKitNfeProvider()
    const saleProductUseCase = new SaleProductUseCase(
      salesRepo,
      productsRepo,
      customersRepo,
      nfeProvider,
    )

    const { nfe } = await saleProductUseCase.execute({
      productsQty,
      productId,
      buyerId,
      paymentMethod: paymentMethod as PaymentMethod,
    })

    return res.status(201).json({ billet: nfe })
  }
}

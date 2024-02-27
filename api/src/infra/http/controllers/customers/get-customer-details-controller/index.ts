import { GetCustomerDetailsUseCase } from '@app/usecases/customers/get-customer-details-usecase'
import { PGCustomersRepository } from '@infra/database/pg/repositories/pg-customers-repository'
import { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
  customerId: z.string().uuid(),
})

export class GetCustomerDetailsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { customerId } = paramsSchema.parse(req.params)

    const customersRepo = new PGCustomersRepository()
    const getCustomerDetailsUseCase = new GetCustomerDetailsUseCase(
      customersRepo,
    )

    const result = await getCustomerDetailsUseCase.execute({
      customerId,
    })

    const customer = {
      name: result.customer.name,
      email: result.customer.email,
      document: result.customer.document,
      ddd: result.customer.ddd,
      phone: result.customer.phone,
    }

    return res.json({ customer })
  }
}

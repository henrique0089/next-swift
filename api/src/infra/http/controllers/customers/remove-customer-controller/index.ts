import { RemoveCustomerUseCase } from '@app/usecases/customers/remove-customer-usecase'
import { PGCustomersRepository } from '@infra/database/pg/repositories/pg-customers-repository'
import { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
  customerId: z.string(),
})

export class RemoveCustomerController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { customerId } = paramsSchema.parse(req.params)

    const customersRepo = new PGCustomersRepository()
    const removeCustomerUseCase = new RemoveCustomerUseCase(customersRepo)

    await removeCustomerUseCase.execute({ customerId })

    return res.status(204).send()
  }
}

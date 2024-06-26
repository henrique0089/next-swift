import { AddCustomerUseCase } from '@app/usecases/customers/add-customer-usecase'
import { PGCustomerAddressRepository } from '@infra/database/pg/repositories/pg-customer-address-repository'
import { PGCustomersRepository } from '@infra/database/pg/repositories/pg-customers-repository'
import { Request, Response } from 'express'
import { z } from 'zod'

const bodySchema = z.object({
  name: z.string(),
  email: z.string(),
  document: z.string(),
  ddd: z.number(),
  phone: z.number(),
  address: z.object({
    street: z.string(),
    number: z.number(),
    complement: z.string().optional(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
  }),
})

export class AddCustomerController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, document, ddd, phone, address } = bodySchema.parse(
      req.body,
    )

    const customersRepo = new PGCustomersRepository()
    const customerAddressRepo = new PGCustomerAddressRepository()
    const addCustomerUseCase = new AddCustomerUseCase(
      customersRepo,
      customerAddressRepo,
    )

    await addCustomerUseCase.execute({
      name,
      email,
      document,
      ddd,
      phone,
      address,
    })

    return res.send()
  }
}

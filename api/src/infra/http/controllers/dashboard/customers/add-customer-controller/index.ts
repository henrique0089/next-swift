import { AddCustomerUseCase } from '@app/dashboard/usecases/customers/add-customer-usecase'
import { PGCustomersRepository } from '@infra/database/pg/dashboard/repositories/pg-customers-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const bodySchema = z.object({
  name: z.string(),
  email: z.string(),
  cpf: z.string(),
  ddd: z.number(),
  phone: z.number(),
  addresses: z
    .object({
      street: z.string(),
      number: z.number(),
      complement: z.string().optional(),
      city: z.string(),
      state: z.string(),
      postalCode: z.string(),
    })
    .array(),
})

export class AddCustomerController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<FastifyReply> {
    const { name, email, cpf, ddd, phone, addresses } = bodySchema.parse(
      req.body,
    )

    const customersRepo = new PGCustomersRepository()
    const addCustomerUseCase = new AddCustomerUseCase(customersRepo)

    await addCustomerUseCase.execute({
      name,
      email,
      cpf,
      ddd,
      phone,
      addresses,
    })

    return rep.send()
  }
}

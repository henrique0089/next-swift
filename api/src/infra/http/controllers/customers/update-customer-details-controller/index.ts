import { UpdateCustomerDetailsUseCase } from '@app/usecases/customers/update-customer-details-usecase'
import { PGCustomersRepository } from '@infra/database/pg/repositories/pg-customers-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const paramsSchema = z.object({
  customerId: z.string().uuid(),
})

const bodySchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  ddd: z.number().optional(),
  phone: z.number().optional(),
  postalCode: z.string().optional(),
  street: z.string().optional(),
  number: z.number().optional(),
  complement: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
})

export class UpdateCustomerDetailsController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<FastifyReply> {
    const { customerId } = paramsSchema.parse(req.params)
    const data = bodySchema.parse(req.body)

    const customersRepo = new PGCustomersRepository()
    const updateCustomerDetailsUseCase = new UpdateCustomerDetailsUseCase(
      customersRepo,
    )

    await updateCustomerDetailsUseCase.execute({
      customerId,
      ...data,
    })

    return rep.status(204).send()
  }
}

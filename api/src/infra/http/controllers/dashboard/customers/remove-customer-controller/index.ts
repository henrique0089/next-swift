import { RemoveCustomerUseCase } from '@app/dashboard/usecases/customers/remove-customer-usecase'
import { PGCustomersRepository } from '@infra/database/pg/dashboard/repositories/pg-customers-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const paramsSchema = z.object({
  customerId: z.string(),
})

export class RemoveCustomerController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<FastifyReply> {
    const { customerId } = paramsSchema.parse(req.params)

    console.log('IP', req.ip)
    const customersRepo = new PGCustomersRepository()
    const removeCustomerUseCase = new RemoveCustomerUseCase(customersRepo)

    await removeCustomerUseCase.execute({ customerId })

    return rep.status(204).send()
  }
}

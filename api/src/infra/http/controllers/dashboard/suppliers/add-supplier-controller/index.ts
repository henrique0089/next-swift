import { AddSupplierUseCase } from '@app/dashboard/usecases/suppliers/add-supplier-usecase'
import { PGSuppliersRepository } from '@infra/database/pg/dashboard/repositories/pg-suppliers-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const bodySchema = z.object({
  name: z.string(),
  email: z.string(),
  cnpj: z.string(),
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

export class AddSupplierController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<FastifyReply> {
    const { name, email, cnpj, ddd, phone, addresses } = bodySchema.parse(
      req.body,
    )

    const SuppliersRepo = new PGSuppliersRepository()
    const addSupplierUseCase = new AddSupplierUseCase(SuppliersRepo)

    await addSupplierUseCase.execute({
      name,
      email,
      cnpj,
      ddd,
      phone,
      addresses,
    })

    return rep.send()
  }
}

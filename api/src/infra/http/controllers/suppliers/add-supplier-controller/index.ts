import { AddSupplierUseCase } from '@app/usecases/suppliers/add-supplier-usecase'
import { PGSuppliersRepository } from '@infra/database/pg/repositories/pg-suppliers-repository'
import { Request, Response } from 'express'
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
  async handle(req: Request, res: Response): Promise<Response> {
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

    return res.send()
  }
}

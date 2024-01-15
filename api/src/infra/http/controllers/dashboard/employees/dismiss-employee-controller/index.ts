import { DismissEmployeeUseCase } from '@app/dashboard/usecases/employees/dismiss-employee-usecase'
import { PGEmployeesRepository } from '@infra/database/pg/dashboard/repositories/pg-employees-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const bodySchema = z.object({
  employeeId: z.string(),
})

export class DismissEmployeeController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<FastifyReply> {
    const adminId = 'adminId'
    const { employeeId } = bodySchema.parse(req.body)

    const employeesRepo = new PGEmployeesRepository()
    const dismissEmployeeUseCase = new DismissEmployeeUseCase(employeesRepo)

    await dismissEmployeeUseCase.execute({ adminId, employeeId })

    return rep.status(204).send()
  }
}

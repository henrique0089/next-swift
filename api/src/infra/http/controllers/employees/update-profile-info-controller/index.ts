import { UpdateProfileInfoUseCase } from '@app/usecases/employees/update-profile-info-usecase'
import { PGEmployeesRepository } from '@infra/database/pg/repositories/pg-employees-repository'
import { ClerkAuthProvider } from '@infra/providers/auth/clerk-auth-provider'
import { Request, Response } from 'express'
import { z } from 'zod'

const bodySchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
})

export class UpdateProfileInfoController {
  async handle(req: Request, res: Response): Promise<Response> {
    const userId = req.auth.userId

    const { firstName, lastName } = bodySchema.parse(req.body)
    const { file } = req

    const employeesRepo = new PGEmployeesRepository()
    const clerkAuthProvider = new ClerkAuthProvider()
    const updateProfileInfoUseCase = new UpdateProfileInfoUseCase(
      employeesRepo,
      clerkAuthProvider,
    )

    await updateProfileInfoUseCase.execute({
      externalId: userId,
      firstName,
      lastName,
      avatar: file && {
        fileName: file.originalname,
        fileType: file.mimetype,
        body: file.buffer,
      },
    })

    return res.status(204).send()
  }
}

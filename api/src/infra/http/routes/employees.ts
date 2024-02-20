import clerkClient, {
  createClerkExpressRequireAuth,
} from '@clerk/clerk-sdk-node'
import { UploaderConfig } from '@infra/config/multer'
import { env } from '@infra/env'
import { DismissEmployeeController } from '@infra/http/controllers/employees/dismiss-employee-controller'
import { GetAllEmployeesController } from '@infra/http/controllers/employees/get-all-employees-controller'
import { HireEmployeeController } from '@infra/http/controllers/employees/hire-employee-controller'
import { Router } from 'express'
import multer from 'multer'
import { GetProfileInfoController } from '../controllers/employees/get-profile-info-controller'
import { UpdateProfileInfoController } from '../controllers/employees/update-profile-info-controller'

const getAllEmployeesController = new GetAllEmployeesController()
const getProfileInfoController = new GetProfileInfoController()
const hireEmployeeController = new HireEmployeeController()
const dismissEmployeeController = new DismissEmployeeController()
const updateProfileInfoController = new UpdateProfileInfoController()

const employeesRouter = Router()

const ClerkExpressRequireAuth = createClerkExpressRequireAuth({
  clerkClient,
  publishableKey: env.CLERK_PUBLISHABLE_KEY,
  secretKey: env.CLERK_SECRET_KEY,
})

const upload = multer(UploaderConfig.execute('avatar'))

employeesRouter.get(
  '/',
  ClerkExpressRequireAuth({
    onError(error) {
      console.log(error)
    },
  }),
  getAllEmployeesController.handle,
)

employeesRouter.get(
  '/me',
  ClerkExpressRequireAuth({
    onError(error) {
      console.log(error)
    },
  }),
  getProfileInfoController.handle,
)

employeesRouter.post(
  '/',
  ClerkExpressRequireAuth(),
  hireEmployeeController.handle,
)

employeesRouter.delete(
  '/dismiss',
  ClerkExpressRequireAuth(),
  dismissEmployeeController.handle,
)

employeesRouter.put(
  '/me/update',
  ClerkExpressRequireAuth(),
  upload.single('avatar'),
  updateProfileInfoController.handle,
)

export { employeesRouter as employeesRoutes }

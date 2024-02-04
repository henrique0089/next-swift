import { Router } from 'express'
import { categoriesRoutes } from './categories'
import { customersRoutes } from './customers'
import { employeesRoutes } from './employees'
import { metricsRoutes } from './metrics'
import { productsRoutes } from './products'
import { rolesRoutes } from './roles'
import { salesRoutes } from './sales'

const router = Router()

router.use('/employees', employeesRoutes)
router.use('/customers', customersRoutes)
router.use('/roles', rolesRoutes)
router.use('/categories', categoriesRoutes)
router.use('/products', productsRoutes)
router.use('/sales', salesRoutes)
router.use('/metrics', metricsRoutes)

export { router as routes }

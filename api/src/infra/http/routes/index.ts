import { Router } from 'express'
import { categoriesRoutes } from './categories'
import { customersRoutes } from './customers'
import { employeesRoutes } from './employees'
import { metricsRoutes } from './metrics'
import { productsRoutes } from './products'
import { rolesRoutes } from './roles'
import { salesRoutes } from './sales'
import { suppliersRoutes } from './suppliers'

const router = Router()

router.use('/employees', employeesRoutes)
router.use('/customers', customersRoutes)
router.use('/roles', rolesRoutes)
router.use('/categories', categoriesRoutes)
router.use('/products', productsRoutes)
router.use('/sales', salesRoutes)
router.use('/metrics', metricsRoutes)
router.use('/suppliers', suppliersRoutes)

export { router as routes }

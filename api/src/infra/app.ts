import fastifyCors from '@fastify/cors'
import fastify from 'fastify'
import { categoriesRoutes } from '../http/routes/categories'

const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.register(categoriesRoutes)

export { app }

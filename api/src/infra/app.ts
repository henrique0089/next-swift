import fastifyCors from '@fastify/cors'
import fastify from 'fastify'
import { appRoutes } from './http/routes'

const app = fastify({ logger: true })

app.register(fastifyCors, {
  origin: '*',
})

appRoutes(app)

export { app }

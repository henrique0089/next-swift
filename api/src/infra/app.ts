import fastifyCors from '@fastify/cors'
import fastify from 'fastify'

import { clerkPlugin, createClerkClient } from '@clerk/fastify'
import { env } from './env'
import { appRoutes } from './http/routes'

const clerkOptions = {
  publishableKey: env.CLERK_PUBLISHABLE_KEY,
  secretKey: env.CLERK_SECRET_KEY,
}

export const clerkClient = createClerkClient(clerkOptions)

const app = fastify({ logger: true })
app.register(clerkPlugin, clerkOptions)
app.register(fastifyCors, {
  origin: '*',
})

appRoutes(app)

export { app }

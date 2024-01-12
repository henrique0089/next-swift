import { FastifyInstance } from 'fastify'

export async function categoriesRoutes(app: FastifyInstance) {
  app.get('/categories', async (req, rep) => {
    return rep.send('Hello')
  })
}

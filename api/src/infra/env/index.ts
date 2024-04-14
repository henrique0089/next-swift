import 'dotenv/config'
import path from 'path'
import { z } from 'zod'

const uploadsFolderPath = path.resolve(__dirname, '..', 'uploads')

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  PORT: z.number().default(3333),
  CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
  CLERK_PEM_PUBLIC_KEY: z.string(),
  UPLOADS_FOLDER_URL: z
    .string()
    .default(
      'https://3333-henrique0089-nextswift-l7jc5jg033c.ws-us110.gitpod.io/images',
    ),
  // AWS_BUCKET: z.string(),
  // FORGOT_MAIL_URL: z.string().default('http://localhost:3000/password?reset='),
  // APP_BASE_URL: z.string().default('http://localhost:3000'),
  // REDIS_HOST: z.string(),
  // REDIS_PORT: z.coerce.number(),
  // REDIS_PASSWORD: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid enviroment variables!', _env.error.format())

  throw new Error('Invalid enviroment variables!')
}

export const env = _env.data

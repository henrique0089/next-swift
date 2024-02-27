import clerkClient, {
  createClerkExpressRequireAuth,
} from '@clerk/clerk-sdk-node'
import { env } from '@infra/env'

export const ClerkExpressRequireAuth = createClerkExpressRequireAuth({
  clerkClient,
  publishableKey: env.CLERK_PUBLISHABLE_KEY,
  secretKey: env.CLERK_SECRET_KEY,
})

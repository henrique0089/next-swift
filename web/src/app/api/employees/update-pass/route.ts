import { auth, clerkClient } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const bodySchema = z.object({
  password: z.string(),
  newPass: z.string(),
  newPassConfirmation: z.string(),
})

export async function PATCH(req: NextRequest) {
  const body = await req.json()
  const { sessionId, userId } = auth()

  if (!sessionId) {
    return NextResponse.json({ err: 'Unauthorized!' }, { status: 401 })
  }

  const { password, newPass, newPassConfirmation } = bodySchema.parse(body)

  try {
    await clerkClient.users.verifyPassword({
      userId,
      password,
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Incorrect password!' },
      { status: 401 },
    )
  }

  if (newPass !== newPassConfirmation) {
    return NextResponse.json(
      { message: 'New password and confirmation not match!' },
      { status: 400 },
    )
  }

  await clerkClient.users.updateUser(userId, {
    password: newPass,
  })

  return NextResponse.json({ ok: true })
}

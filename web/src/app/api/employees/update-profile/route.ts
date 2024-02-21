import { auth, clerkClient } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
  const { sessionId, userId } = auth()

  if (!sessionId) {
    return NextResponse.json({ err: 'Unauthorized!' }, { status: 401 })
  }

  const body = await req.formData()
  const firstName = body.get('firstName')
  const lastName = body.get('lastName')
  const avatar = body.get('avatar') as File

  await clerkClient.users.updateUser(userId, {
    firstName: firstName?.toString(),
    lastName: lastName?.toString(),
  })

  await clerkClient.users.updateUserProfileImage(userId, {
    file: avatar,
  })

  return NextResponse.json({ ok: true })
}

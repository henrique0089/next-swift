import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const bodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  cpf: z.string(),
  ddd: z.coerce.number(),
  phone: z.coerce.number(),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { getToken, sessionId } = auth()

  if (!sessionId) {
    return NextResponse.json({ err: 'Unauthorized!' }, { status: 401 })
  }

  const { firstName, lastName, email, cpf, ddd, phone } = bodySchema.parse(body)
  console.log(req)
  // const res = await api.post<{ password: string }>(
  //   '/employees',
  //   {
  //     firstName,
  //     lastName,
  //     email,
  //     cpf,
  //     ddd,
  //     phone,
  //   },
  //   {
  //     headers: {
  //       Authorization: `Bearer ${await getToken()}`,
  //     },
  //   },
  // )
}

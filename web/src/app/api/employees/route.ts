import EmailTemplate from '@/app/(app)/employees/components/email-template'

import { api } from '@/lib/axios'
import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const bodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  ddd: z.coerce.number(),
  phone: z.coerce.number(),
  gender: z.enum(['M', 'F']),
  roleId: z.string(),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { getToken, sessionId } = auth()

  if (!sessionId) {
    return NextResponse.json({ err: 'Unauthorized!' }, { status: 401 })
  }

  const data = bodySchema.parse(body)

  const res = await api.post<{ password: string }>('/employees', data, {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  })

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    await resend.emails.send({
      to: data.email,
      from: 'onboarding@resend.dev',
      subject: 'Contract Completed',
      react: EmailTemplate({ pass: res.data.password }),
    })
  } catch (error) {
    console.log(error)
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}

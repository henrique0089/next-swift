import { EmailTemplate } from '@/app/(app)/employees/components/email-template'
import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const bodySchema = z.object({
  email: z.string(),
  pass: z.string(),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { sessionId } = auth()

  if (!sessionId) {
    return NextResponse.json({ err: 'Unauthorized!' }, { status: 401 })
  }

  const { email, pass } = bodySchema.parse(body)

  const resend = new Resend(process.env.RESEND_API_KEY)

  await resend.emails.send({
    to: email,
    from: 'onboarding@resend.dev',
    subject: 'Contract Completed',
    react: EmailTemplate({ pass }),
  })

  return NextResponse.json({ ok: true }, { status: 201 })
}


import { Header } from '@/components/header'
import { api } from '@/lib/axios'
import { auth } from '@clerk/nextjs'
import { ReactNode } from 'react'

interface PanelLayoutProps {
  children: ReactNode
}

export default async function PanelLayout({ children }: PanelLayoutProps) {
  const { getToken } = auth()

  const res = await api.get('/employees/me', {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  })

  return (
    <html lang="en">
      <body>
        <main>
          <Header />
          {children}
        </main>
      </body>
    </html>
  )
}

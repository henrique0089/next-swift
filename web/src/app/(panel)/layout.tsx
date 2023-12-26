import { Header } from '@/components/header'
import { ReactNode } from 'react'

interface PanelLayoutProps {
  children: ReactNode
}

export default function PanelLayout({ children }: PanelLayoutProps) {
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
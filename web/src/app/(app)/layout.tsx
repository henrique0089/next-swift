import { Header } from '@/components/header'
import { ReactNode } from 'react'

interface PanelLayoutProps {
  children: ReactNode
}

export default async function PanelLayout({ children }: PanelLayoutProps) {
  // const { getToken } = auth()

  // const res = await api.get<{ employee: EmployeeData }>('/employees/me', {
  //   headers: {
  //     Authorization: `Bearer ${await getToken()}`,
  //   },
  // })

  // useEmployeeStore.setState({ employee: res.data.employee })

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

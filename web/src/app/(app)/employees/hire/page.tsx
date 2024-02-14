import { api } from '@/lib/axios'
import { auth } from '@clerk/nextjs'
import { HireEmployeeForm } from '../components/hire-employee-form'

interface RolesResponse {
  roles: string[]
}

export default async function HireEmployee() {
  const { getToken } = auth()

  const res = await api.get<RolesResponse>('/roles', {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  })

  return (
    <section className="min-h-screen max-w-6xl w-full mx-auto space-y-8 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Hire a employee</h1>
        <span className="block text-muted-foreground">
          Hire a new employee to expand your team.
        </span>
      </div>

      <HireEmployeeForm roles={res.data.roles} />
    </section>
  )
}

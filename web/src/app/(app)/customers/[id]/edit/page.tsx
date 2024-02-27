import { api } from '@/lib/axios'
import { auth } from '@clerk/nextjs'
import { UpdateCustomerForm } from '../../components/update-customer-form'

interface UpdateCustomerProps {
  params: {
    id: string
  }
}

export type CustomerDetails = {
  name: string
  email: string
  document: string
  ddd: number
  phone: number
}

export default async function UpdateCustomer({
  params: { id },
}: UpdateCustomerProps) {
  const { getToken } = auth()

  const res = await api.get<{ customer: CustomerDetails }>(
    `/customers/${id}/details`,
    {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    },
  )

  return (
    <section className="min-h-screen max-w-6xl w-full mx-auto space-y-8 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Update Customer</h1>
        <span className="block text-muted-foreground">
          Update a customer present in your list.
        </span>
      </div>

      <UpdateCustomerForm customerId={id} customer={res.data.customer} />
    </section>
  )
}

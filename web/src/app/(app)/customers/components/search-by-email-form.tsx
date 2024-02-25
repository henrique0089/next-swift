import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'
import { useCustomersStore } from '@/store/customers-store'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CustomerData } from '../page'

const SearchByEmailFormSchema = z.object({
  email: z.string(),
})

type SearchByEmailFormValues = z.infer<typeof SearchByEmailFormSchema>

export function SearchByEmailForm() {
  const { getToken } = useAuth()
  const { setCustomers, dates } = useCustomersStore()
  const { handleSubmit, register, reset } = useForm<SearchByEmailFormValues>({
    resolver: zodResolver(SearchByEmailFormSchema),
  })

  async function handleSearch({ email }: SearchByEmailFormValues) {
    const res = await api.get<{ customers: CustomerData[] }>('/customers', {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
      params: {
        email,
        startDate: dates?.from,
        endDate: dates?.to,
      },
    })

    setCustomers(res.data.customers)

    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="w-full space-y-2">
      <Label htmlFor="email">Search by any email</Label>
      <Input id="email" placeholder="000.000.000-00" {...register('email')} />
    </form>
  )
}

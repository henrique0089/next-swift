import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'
import { useCustomersStore } from '@/store/customers-store'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CustomerData } from '../page'

const SearchByCustomerFormSchema = z.object({
  customer: z.string(),
})

type SearchByCustomerFormValues = z.infer<typeof SearchByCustomerFormSchema>

interface SearchByCustomerFormProps {
  disabled?: boolean
}

export function SearchByCustomerForm({
  disabled = false,
}: SearchByCustomerFormProps) {
  const { getToken } = useAuth()
  const { setCustomers, dates } = useCustomersStore()
  const { handleSubmit, register, reset } = useForm<SearchByCustomerFormValues>(
    {
      resolver: zodResolver(SearchByCustomerFormSchema),
    },
  )

  async function handleSearch({ customer }: SearchByCustomerFormValues) {
    const res = await api.get<{ customers: CustomerData[] }>('/customers', {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
      params: {
        customer,
        startDate: dates?.from,
        endDate: dates?.to,
      },
    })

    setCustomers(res.data.customers)

    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="w-full space-y-2">
      <Label htmlFor="customer">Search by any customer</Label>
      <Input
        id="customer"
        placeholder="jhon doe"
        disabled={disabled}
        {...register('customer')}
      />
    </form>
  )
}

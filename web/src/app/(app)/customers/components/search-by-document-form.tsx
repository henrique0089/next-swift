import { MaskedInput } from '@/components/masked-input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'
import { useCustomersStore } from '@/store/customers-store'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CustomerData } from '../page'

const SearchByDocumentFormSchema = z.object({
  document: z.string(),
})

type SearchByDocumentFormValues = z.infer<typeof SearchByDocumentFormSchema>

interface SearchByDocumentFormProps {
  disabled?: boolean
}

export function SearchByDocumentForm({
  disabled = false,
}: SearchByDocumentFormProps) {
  const { getToken } = useAuth()
  const { setCustomers, dates } = useCustomersStore()
  const { handleSubmit, register, reset } = useForm<SearchByDocumentFormValues>(
    {
      resolver: zodResolver(SearchByDocumentFormSchema),
    },
  )

  async function handleSearch({ document }: SearchByDocumentFormValues) {
    const res = await api.get<{ customers: CustomerData[] }>('/customers', {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
      params: {
        document,
        startDate: dates?.from,
        endDate: dates?.to,
      },
    })

    setCustomers(res.data.customers)

    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="w-full space-y-2">
      <Label htmlFor="document">Search by any document</Label>
      <MaskedInput
        id="document"
        mask="cpf"
        placeholder="000.000.000-00"
        disabled={disabled}
        {...register('document')}
      />
    </form>
  )
}

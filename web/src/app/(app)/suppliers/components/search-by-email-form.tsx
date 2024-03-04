import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'
import { useSuppliersStore } from '@/store/suppliers-store'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { SupplierData } from '../page'

const SearchByEmailFormSchema = z.object({
  email: z.string(),
})

type SearchByEmailFormValues = z.infer<typeof SearchByEmailFormSchema>

interface SearchByEmailFormProps {
  disabled?: boolean
}

export function SearchByEmailForm({
  disabled = false,
}: SearchByEmailFormProps) {
  const { getToken } = useAuth()
  const { setSuppliers, dates } = useSuppliersStore()
  const { handleSubmit, register, reset } = useForm<SearchByEmailFormValues>({
    resolver: zodResolver(SearchByEmailFormSchema),
  })

  async function handleSearch({ email }: SearchByEmailFormValues) {
    const res = await api.get<{ suppliers: SupplierData[] }>('/suppliers', {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
      params: {
        email,
        startDate: dates?.from,
        endDate: dates?.to,
      },
    })

    setSuppliers(res.data.suppliers)

    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="w-full space-y-2">
      <Label htmlFor="email">Search by any email</Label>
      <Input
        id="email"
        placeholder="jhondoe@gmail.com"
        disabled={disabled}
        {...register('email')}
      />
    </form>
  )
}

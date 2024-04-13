import { MaskedInput } from '@/components/masked-input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'
import { useSuppliersStore } from '@/store/suppliers-store'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { SupplierData } from '../page'

const SearchByCnpjFormSchema = z.object({
  cnpj: z.string(),
})

type SearchByCnpjFormValues = z.infer<typeof SearchByCnpjFormSchema>

interface SearchByCnpjFormProps {
  disabled?: boolean
}

export function SearchByCnpjForm({ disabled = false }: SearchByCnpjFormProps) {
  const { getToken } = useAuth()
  const { setSuppliers, dates } = useSuppliersStore()
  const { handleSubmit, register, reset } = useForm<SearchByCnpjFormValues>({
    resolver: zodResolver(SearchByCnpjFormSchema),
  })

  async function handleSearch({ cnpj }: SearchByCnpjFormValues) {
    const res = await api.get<{ suppliers: SupplierData[] }>('/suppliers', {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
      params: {
        cnpj,
        startDate: dates?.from,
        endDate: dates?.to,
      },
    })

    setSuppliers(res.data.suppliers)

    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="w-full space-y-2">
      <Label htmlFor="cnpj">Search by any cnpj</Label>
      <MaskedInput
        id="cnpj"
        mask="cnpj"
        placeholder="00.000.000/0000-00"
        disabled={disabled}
        {...register('cnpj')}
      />
    </form>
  )
}

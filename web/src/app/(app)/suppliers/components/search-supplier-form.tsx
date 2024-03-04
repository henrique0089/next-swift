import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'
import { useSuppliersStore } from '@/store/suppliers-store'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { SupplierData } from '../page'

const SearchBySupplierFormSchema = z.object({
  supplier: z.string(),
})

type SearchBySupplierFormValues = z.infer<typeof SearchBySupplierFormSchema>

interface SearchBySupplierFormProps {
  disabled?: boolean
}

export function SearchBySupplierForm({
  disabled = false,
}: SearchBySupplierFormProps) {
  const { getToken } = useAuth()
  const { setSuppliers, dates } = useSuppliersStore()
  const { handleSubmit, register, reset } = useForm<SearchBySupplierFormValues>(
    {
      resolver: zodResolver(SearchBySupplierFormSchema),
    },
  )

  async function handleSearch({ supplier }: SearchBySupplierFormValues) {
    const res = await api.get<{ suppliers: SupplierData[] }>('/suppliers', {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
      params: {
        supplier,
        startDate: dates?.from,
        endDate: dates?.to,
      },
    })

    setSuppliers(res.data.suppliers)

    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="w-full space-y-2">
      <Label htmlFor="supplier">Search by any supplier</Label>
      <Input
        id="supplier"
        placeholder="jhon doe"
        disabled={disabled}
        {...register('supplier')}
      />
    </form>
  )
}

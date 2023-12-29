import { Input } from '@/components/ui/input'

interface EmployeesFormProps {
  placeholder?: string
}

export function SuppliersForm({ placeholder }: EmployeesFormProps) {
  return (
    <form className="w-full">
      <Input type="search" placeholder={placeholder} />
    </form>
  )
}

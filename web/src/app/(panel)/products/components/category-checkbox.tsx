import { Checkbox } from '@/components/ui/checkbox'

interface CategoryCheckboxProps {
  id: string
  label: string
}

export function CategoryCheckbox({ id, label }: CategoryCheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id={id} />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  )
}

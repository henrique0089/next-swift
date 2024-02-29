import { Checkbox } from '@/components/ui/checkbox'

interface CategoryCheckboxProps {
  id: string
  label: string
  selected: string[]
  onUpdate: (value: string[]) => void
}

export function CategoryCheckbox({
  id,
  label,
  selected,
  onUpdate,
}: CategoryCheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={id}
        checked={selected.includes(id)}
        onCheckedChange={(checked) => {
          return checked
            ? onUpdate([...selected, id])
            : onUpdate(selected.filter((categoryId) => categoryId !== id))
        }}
      />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  )
}

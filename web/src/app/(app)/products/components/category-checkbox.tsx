import { Checkbox } from '@/components/ui/checkbox'
import { CategoryOption } from '../add/page'

interface CategoryCheckboxProps {
  id: string
  label: string
  selected: CategoryOption[]
  onUpdate: (value: CategoryOption[]) => void
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
        checked={selected?.some((category) => category.value === id)}
        onCheckedChange={(checked) => {
          return checked
            ? onUpdate([
                ...selected,
                {
                  label,
                  value: id,
                },
              ])
            : onUpdate(selected.filter((category) => category.value !== id))
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

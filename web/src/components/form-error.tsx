import { CircleAlert } from 'lucide-react'
import { ReactNode } from 'react'

export function FormError({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-red-600 text-sm">
      <CircleAlert className="size-4" /> {children}
    </span>
  )
}

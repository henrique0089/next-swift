'use client'

import { InputHTMLAttributes, forwardRef, useCallback } from 'react'

import { cn } from '@/lib/utils'
import { cep, cnpj, cpf } from './masks'

export interface MaskedInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  mask: 'cep' | 'cpf' | 'cnpj'
}

const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ className, type, mask, ...props }, ref) => {
    const handleKeyUp = useCallback(
      (e: React.FormEvent<HTMLInputElement>) => {
        if (mask === 'cep') {
          cep(e)
        }

        if (mask === 'cpf') {
          cpf(e)
        }

        if (mask === 'cnpj') {
          cnpj(e)
        }
      },
      [mask],
    )

    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        onKeyUp={handleKeyUp}
        ref={ref}
        {...props}
      />
    )
  },
)

MaskedInput.displayName = 'MaskedInput'

export { MaskedInput }

import { FormEvent } from 'react'

export function cep(e: FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 9

  let value = e.currentTarget.value
  value = value.replace(/\D/g, '')
  value = value.replace(/^(\d{5})(\d)/, '$1-$2')
  e.currentTarget.value = value

  return e
}

export function cpf(e: FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 14

  let value = e.currentTarget.value

  if (!value.match(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/)) {
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d{2})$/, '$1-$2')
    e.currentTarget.value = value
  }

  return e
}

export function cnpj(e: FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 18

  let value = e.currentTarget.value

  if (!value.match(/^(\d{2}).(\d{3}).(\d{3})\/(\d{4})-(\d{2})$/)) {
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d)/, '$1/$2')
    value = value.replace(/(\d{4})(\d{2})$/, '$1-$2')
    e.currentTarget.value = value
  }

  return e
}

export function phone(e: FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 11
  e.currentTarget.placeholder = '9 12345678' // Placeholder adicionado

  let value = e.currentTarget.value

  if (!value.match(/^(\d{1})\s?(\d{8})$/)) {
    value = value.replace(/\D/g, '')
    value = value.replace(/^(\d{1})(\d{8})$/, '$1 $2')
    value = value.replace(/^(\d{1})(\d{4})(\d{4})$/, '$1 $2 $3')
    e.currentTarget.value = value
  }

  return e
}

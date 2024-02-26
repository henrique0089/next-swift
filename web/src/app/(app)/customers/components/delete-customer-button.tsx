'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { api } from '@/lib/axios'
import { useAuth } from '@clerk/nextjs'
import { ReactNode, useState } from 'react'

interface DeleteCustomerButtonProps {
  customerId: string
  customerName: string
  children: ReactNode
}

export function DeleteCustomerButton({
  customerId,
  customerName,
  children,
}: DeleteCustomerButtonProps) {
  const { getToken } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  async function handleRemoveCustomer() {
    try {
      await api.delete(`/customers/${customerId}/remove`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })

      console.log(customerId)

      setIsOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AlertDialog onOpenChange={setIsOpen} open={isOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove the
            customer: <strong>{customerName}</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemoveCustomer}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

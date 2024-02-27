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
import { useCustomersStore } from '@/store/customers-store'
import { useAuth } from '@clerk/nextjs'
import { AxiosError } from 'axios'
import { ReactNode, useState } from 'react'
import { toast } from 'sonner'

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
  const { customers, setCustomers } = useCustomersStore()
  const [isOpen, setIsOpen] = useState(false)

  async function handleRemoveCustomer() {
    try {
      await api.delete(`/customers/${customerId}/remove`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })

      const filteredCustomers = customers.filter(
        (customer) => customer.id !== customerId,
      )
      setCustomers(filteredCustomers)

      setIsOpen(false)

      toast('Success!', {
        description: 'customer deleted succesfuly.',
        position: 'bottom-right',
        dismissible: true,
        duration: 2000,
        cancel: {
          label: 'dismiss',
        },
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        toast('Uh oh! Something went wrong.', {
          description: error.response?.data.message,
          position: 'bottom-right',
          dismissible: true,
          duration: 2000,
          cancel: {
            label: 'dismiss',
          },
        })
      }
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

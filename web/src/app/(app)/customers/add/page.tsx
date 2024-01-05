import { AddCustomerForm } from '../components/add-customer-form'

export default function AddCustomer() {
  return (
    <section className="min-h-screen max-w-6xl w-full mx-auto space-y-8 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Add Customer</h1>
        <span className="block text-muted-foreground">
          Add a new customer to your list.
        </span>
      </div>

      <AddCustomerForm />
    </section>
  )
}

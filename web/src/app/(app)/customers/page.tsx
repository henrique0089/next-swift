import { CustomersContent } from './components/customers-content'

export default function Customers() {
  return (
    <section className="min-h-screen max-w-6xl w-full mx-auto space-y-8 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <span className="block text-muted-foreground">
          Manage all of your customers.
        </span>
      </div>

      <CustomersContent />
    </section>
  )
}

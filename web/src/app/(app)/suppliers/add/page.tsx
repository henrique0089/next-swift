import { AddSupplierForm } from '../components/add-supplier-form'

export default function AddSupplier() {
  return (
    <section className="min-h-screen max-w-6xl w-full mx-auto space-y-8 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Add Supplier</h1>
        <span className="block text-muted-foreground">
          Add a new supplier to your list.
        </span>
      </div>

      <AddSupplierForm />
    </section>
  )
}

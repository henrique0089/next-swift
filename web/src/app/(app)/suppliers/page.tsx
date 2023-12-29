import { SuppliersContent } from './components/suppliers-content'

export default function Suppliers() {
  return (
    <section className="min-h-screen max-w-6xl w-full mx-auto space-y-8 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
        <span className="block text-muted-foreground">
          Manage all of your suppliers.
        </span>
      </div>

      <SuppliersContent />
    </section>
  )
}

import { AddProductForm } from '../components/add-product-form'

export default function AddProduct() {
  return (
    <section className="min-h-screen max-w-6xl w-full mx-auto space-y-8 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Add Product</h1>
        <span className="block text-muted-foreground">
          Add a new product to your catalog.
        </span>
      </div>

      <AddProductForm />
    </section>
  )
}

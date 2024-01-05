import { UpdateProductForm } from '../../components/update-product-form'

export default function UpdateProduct() {
  return (
    <section className="min-h-screen max-w-6xl w-full mx-auto space-y-8 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Update Product</h1>
        <span className="block text-muted-foreground">
          Update a product present in your catalog.
        </span>
      </div>

      <UpdateProductForm />
    </section>
  )
}

import { AddSaleForm } from '../components/add-sale-form'
import { SearchCustomersForm } from '../components/search-customers-form'
import { SearchProductsForm } from '../components/search-products-form'

export default function AddSale() {
  return (
    <section className="min-h-screen max-w-6xl w-full mx-auto space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Add Sale</h1>
          <span className="block text-muted-foreground">
            Sell a product and add to your list.
          </span>
        </div>

        <div className="flex items-center gap-4">
          <SearchCustomersForm />
          <SearchProductsForm />
        </div>
      </div>

      <AddSaleForm />
    </section>
  )
}

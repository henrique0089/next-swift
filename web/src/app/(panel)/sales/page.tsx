import { SalesContent } from './components/sales-content'

export default function Sales() {
  return (
    <section className="min-h-screen p-4 lg:p-6 flex flex-col gap-4">
      <h1 className="text-3xl text-center font-bold tracking-tight mx-6">
        Sales
      </h1>

      <SalesContent />

      <div></div>
    </section>
  )
}

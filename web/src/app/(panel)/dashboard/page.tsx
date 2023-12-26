import { CalendarDateRangePicker } from './components/calendar-date-range-picker';
import { MonthOrdersAmountCard } from './components/month-orders-amount-card';
import { ProductsInStockCard } from './components/products-in-stock-card';

export default function Dashboard() {
  return (
    <section className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <CalendarDateRangePicker />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <MonthOrdersAmountCard />
        <ProductsInStockCard />
      </div>

    </section>
  )
}
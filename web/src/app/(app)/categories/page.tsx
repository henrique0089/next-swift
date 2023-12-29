import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Trash } from 'lucide-react'

export default function Categories() {
  return (
    <section className="min-h-screen max-w-6xl w-full mx-auto space-y-8 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <span className="block text-muted-foreground">
          Manage all of your categories.
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] lg:items-start space-y-8 lg:space-y-0 lg:space-x-4">
        <nav className="space-y-6">
          <div className="space-y-2">
            <span className="block text-sm font-semibold">
              Create an category
            </span>

            <form>
              <Input placeholder="Black shoes..." />
            </form>
          </div>

          <Separator />

          <div className="space-y-2">
            <span className="block text-sm font-semibold">
              Search by any category
            </span>

            <form>
              <Input placeholder="Yellow t-shirts..." />
            </form>
          </div>
        </nav>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>99df9df7f7</TableCell>
                <TableCell>t-shirts</TableCell>
                <TableCell>134</TableCell>
                <TableCell>29/12/2023</TableCell>
                <TableCell>
                  <button>
                    <Trash className="h-5 w-5 stroke-muted-foreground" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

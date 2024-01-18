import { Supplier } from '@app/dashboard/entities/supplier'
import {
  PaginateParams,
  SuppliersRepository,
} from '@app/dashboard/repositories/suppliers-repository'

export class InMemorySuppliersRepository implements SuppliersRepository {
  public suppliers: Supplier[] = []

  async findById(supplierId: string): Promise<Supplier | null> {
    const supplier = await this.suppliers.find(
      (supplier) => supplier.id === supplierId,
    )

    if (!supplier) {
      return null
    }

    return supplier
  }

  async findByEmail(email: string): Promise<Supplier | null> {
    const supplier = await this.suppliers.find(
      (supplier) => supplier.email === email,
    )

    if (!supplier) {
      return null
    }

    return supplier
  }

  async paginate({ page, limit }: PaginateParams): Promise<Supplier[]> {
    const start = (page - 1) * limit
    const end = page * limit

    const paginatedSuppliers = this.suppliers.slice(start, end)

    return paginatedSuppliers
  }

  async create(supplier: Supplier): Promise<void> {
    this.suppliers.push(supplier)
  }

  async save(supplier: Supplier): Promise<void> {
    const supplierIndex = this.suppliers.findIndex((s) => s.id === supplier.id)

    if (supplierIndex > -1) {
      this.suppliers[supplierIndex] = supplier
    }
  }

  async delete(supplierId: string): Promise<void> {
    const supplierIndex = this.suppliers.findIndex(
      (supplier) => supplier.id === supplierId,
    )

    if (supplierIndex > -1) {
      this.suppliers.splice(supplierIndex, 1)
    }
  }
}

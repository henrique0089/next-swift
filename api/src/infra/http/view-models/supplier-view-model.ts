import { Supplier } from '@app/entities/supplier'

export class SupplierViewModel {
  static toHttp(customer: Supplier) {
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      cnpj: customer.cnpj,
      ddd: customer.ddd,
      phone: customer.phone,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    }
  }
}

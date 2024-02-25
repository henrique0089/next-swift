import { Customer } from '@app/entities/customer'

export class CustomerViewModel {
  static toHttp(customer: Customer) {
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      document: customer.cpf,
      ddd: customer.ddd,
      phone: customer.phone,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    }
  }
}

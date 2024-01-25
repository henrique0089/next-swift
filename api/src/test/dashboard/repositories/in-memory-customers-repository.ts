import { Customer } from '@app/entities/customer'
import {
  CustomersRepository,
  PaginateParams,
} from '@app/repositories/customer-repository'
import dayjs from 'dayjs'

export class InMemoryCustomersRepository implements CustomersRepository {
  public customers: Customer[] = []

  async findById(customerId: string): Promise<Customer | null> {
    const customer = await this.customers.find(
      (customer) => customer.id === customerId,
    )

    if (!customer) {
      return null
    }

    return customer
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.customers.find(
      (customer) => customer.email === email,
    )

    if (!customer) {
      return null
    }

    return customer
  }

  async paginate({ page, limit }: PaginateParams): Promise<Customer[]> {
    const start = (page - 1) * limit
    const end = page * limit

    const paginatedCustomers = this.customers.slice(start, end)

    return paginatedCustomers
  }

  async create(customer: Customer): Promise<void> {
    this.customers.push(customer)
  }

  async save(customer: Customer): Promise<void> {
    const customerIndex = this.customers.findIndex((c) => c.id === customer.id)

    if (customerIndex > -1) {
      this.customers[customerIndex] = customer
    }
  }

  async delete(customerId: string): Promise<void> {
    const customerIndex = this.customers.findIndex(
      (customer) => customer.id === customerId,
    )

    if (customerIndex > -1) {
      this.customers.splice(customerIndex, 1)
    }
  }

  async getCurrentMonthTotalCount(): Promise<number> {
    const currentMonth = dayjs().format('YYYY-MM-DD').split('-')[1]

    const filtereCustomers = this.customers.filter((customer) => {
      const isSameMonth =
        dayjs(customer.createdAt).format('YYYY-MM-DD').split('-')[1] ===
        currentMonth

      return isSameMonth
    })

    return filtereCustomers.length
  }

  async getLastMonthTotalCount(): Promise<number> {
    const currentMonth = dayjs().format('YYYY-MM-DD').split('-')[1]

    const filtereCustomers = this.customers.filter((customer) => {
      const isSameMonth =
        dayjs(customer.createdAt).format('YYYY-MM-DD').split('-')[1] ===
        currentMonth

      return isSameMonth
    })

    return filtereCustomers.length
  }
}

import { Customer } from '@app/entities/customer'
import {
  CustomersRepository,
  PaginateParams,
  PaginateResponse,
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

  async paginate({
    customer,
    document,
    email,
    startDate,
    endDate,
    page = 1,
    limit = 10,
  }: PaginateParams): Promise<PaginateResponse> {
    const start = (page - 1) * limit
    const end = page * limit

    let customers: Customer[] = []

    if (startDate && endDate && !customer && !email && !document) {
      customers = this.customers
        .filter((customer) => {
          return (
            customer.createdAt >= startDate && customer.createdAt <= endDate
          )
        })
        .slice(start, end)
    } else if (!startDate && !endDate && customer && !email && !document) {
      customers = this.customers
        .filter((customerData) => {
          return customerData.name
            .toLocaleLowerCase()
            .includes(customer.toLocaleLowerCase())
        })
        .slice(start, end)
    } else if (!startDate && !endDate && !customer && email && !document) {
      customers = this.customers
        .filter((customerData) => {
          return customerData.email === email
        })
        .slice(start, end)
    } else if (!startDate && !endDate && !customer && !email && document) {
      customers = this.customers
        .filter((customerData) => {
          return customerData.document === document
        })
        .slice(start, end)
    } else if (startDate && endDate && customer && email && document) {
      customers = this.customers
        .filter(
          (customerData) =>
            customerData.createdAt >= startDate &&
            customerData.createdAt <= endDate &&
            customerData.name
              .toLocaleLowerCase()
              .includes(customer.toLocaleLowerCase()) &&
            customerData.email === email &&
            customerData.document === document,
        )
        .slice(start, end)
    } else {
      customers = this.customers.slice(start, end)
    }

    return {
      customers,
      totalCount: this.customers.length,
    }
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

  async delete(customer: Customer): Promise<void> {
    const customerIndex = this.customers.findIndex(
      (customerData) => customerData.id === customer.id,
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

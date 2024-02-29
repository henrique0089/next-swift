import { CustomerAddressesRepository } from '@app/repositories/customer-addresses-repository'

export class InMemoryCustomerAddressesRepository
  implements CustomerAddressesRepository
{
  public addrs: string[] = []

  async findByPostalCode(postalCode: string): Promise<string | null> {
    const addr = this.addrs.find((code) => code === postalCode)

    if (!addr) return null

    return addr
  }
}

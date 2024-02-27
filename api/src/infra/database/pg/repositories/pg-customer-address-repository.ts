import { CustomerAddressesRepository } from '@app/repositories/customer-addresses-repository'
import { client } from '../connection'

export class PGCustomerAddressRepository
  implements CustomerAddressesRepository
{
  async findByPostalCode(postalCode: string): Promise<string | null> {
    const { rows } = await client.query<{ id: string }>(
      `SELECT id FROM addresses WHERE postal_code = $1 LIMIT 1`,
      [postalCode],
    )

    if (rows.length === 0) {
      return null
    }

    return rows[0].id
  }
}

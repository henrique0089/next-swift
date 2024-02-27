export interface CustomerAddressesRepository {
  findByPostalCode(postalCode: string): Promise<string | null>
}

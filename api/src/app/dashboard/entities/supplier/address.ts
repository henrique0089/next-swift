import { Replace } from '@helpers/replace'
import { randomUUID } from 'crypto'

interface AddressProps {
  street: string
  number: number
  complement?: string | null
  city: string
  state: string
  postalCode: string
  createdAt: Date
}

export class Address {
  private _id: string
  private props: AddressProps

  constructor(props: Replace<AddressProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }
  }

  public get id(): string {
    return this._id
  }

  public get street(): string {
    return this.props.street
  }

  public set street(street: string) {
    this.props.street = street
  }

  public get number(): number {
    return this.props.number
  }

  public set number(number: number) {
    this.props.number = number
  }

  public get complement(): string | null | undefined {
    return this.props.complement
  }

  public set complement(complement: string | null | undefined) {
    this.props.complement = complement
  }

  public get city(): string {
    return this.props.city
  }

  public set city(city: string) {
    this.props.city = city
  }

  public get state(): string {
    return this.props.state
  }

  public set state(state: string) {
    this.props.state = state
  }

  public get postalCode(): string {
    return this.props.postalCode
  }

  public set postalCode(postalCode: string) {
    this.props.postalCode = postalCode
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }
}

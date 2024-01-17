import { Replace } from '@helpers/replace'
import { randomUUID } from 'node:crypto'
import { Address } from './address'

interface CustomerProps {
  name: string
  email: string
  cpf: string
  ddd: number
  phone: number
  addresses: Address[]
  deletedAt?: Date | null
  createdAt: Date
  updatedAt?: Date | null
}

export class Customer {
  private _id: string
  private props: CustomerProps

  constructor(
    props: Replace<CustomerProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }
  }

  public get id(): string {
    return this._id
  }

  public get name(): string {
    return this.props.name
  }

  public set name(name: string) {
    this.props.name = name
  }

  public get email(): string {
    return this.props.email
  }

  public set email(email: string) {
    this.props.email = email
  }

  public get cpf(): string {
    return this.props.cpf
  }

  public set cpf(cpf: string) {
    this.props.cpf = cpf
  }

  public get ddd(): number {
    return this.props.ddd
  }

  public set ddd(ddd: number) {
    this.props.ddd = ddd
  }

  public get phone(): number {
    return this.props.phone
  }

  public set phone(phone: number) {
    this.props.phone = phone
  }

  public get addresses(): Address[] {
    return this.props.addresses
  }

  public set addresses(addresses: Address[]) {
    this.props.addresses = addresses
  }

  public get deletedAt(): Date | null | undefined {
    return this.props.deletedAt
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }

  public get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  public update() {
    this.props.updatedAt = new Date()
  }

  public remove() {
    this.props.deletedAt = new Date()
  }
}

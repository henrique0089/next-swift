import { Replace } from '@helpers/replace'
import { randomUUID } from 'node:crypto'

interface EmployeeProps {
  name: string
  email: string
  password: string
  phone: number
  avatar: string | null
  roles: string[] | null
  createdAt: Date
  updatedAt?: Date | null
  dismissedAt?: Date | null
}

export class Employee {
  private _id: string
  private props: EmployeeProps

  constructor(
    props: Replace<EmployeeProps, { createdAt?: Date }>,
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

  public get password(): string {
    return this.props.password
  }

  public set password(password: string) {
    this.props.password = password
  }

  public get phone(): number {
    return this.props.phone
  }

  public set phone(phone: number) {
    this.props.phone = phone
  }

  public get avatar(): string | null {
    return this.props.avatar
  }

  public set avatar(avatar: string | null) {
    this.props.avatar = avatar
  }

  public get roles(): string[] | null {
    return this.props.roles
  }

  public set roles(roles: string[] | null) {
    this.props.roles = roles
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }

  public get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  public get dismissedAt(): Date | null | undefined {
    return this.props.dismissedAt
  }

  public update() {
    this.props.updatedAt = new Date()
  }

  public dismiss() {
    this.props.dismissedAt = new Date()
  }
}

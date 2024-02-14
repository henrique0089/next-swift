import { Replace } from '@helpers/replace'
import { randomUUID } from 'node:crypto'

export type Gender = 'M' | 'F'
export type Role = 'admin' | 'editor'

interface EmployeeProps {
  firstName: string
  lastName: string
  email: string
  ddd: number
  phone: number
  avatar: string | null
  gender: Gender
  role: Role | null
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

  public get firstName(): string {
    return this.props.firstName
  }

  public set firstName(firstName: string) {
    this.props.firstName = firstName
  }

  public get lastName(): string {
    return this.props.lastName
  }

  public set lastName(lastName: string) {
    this.props.lastName = lastName
  }

  public get email(): string {
    return this.props.email
  }

  public set email(email: string) {
    this.props.email = email
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

  public get avatar(): string | null {
    return this.props.avatar
  }

  public set avatar(avatar: string | null) {
    this.props.avatar = avatar
  }

  public get gender(): Gender {
    return this.props.gender
  }

  public set gender(gender: Gender) {
    this.props.gender = gender
  }

  public get role(): Role | null {
    return this.props.role
  }

  public set role(role: Role | null) {
    this.props.role = role
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

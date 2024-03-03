import { Replace } from '@helpers/replace'
import { randomUUID } from 'node:crypto'

export enum PaymentMethod {
  money = 'money',
  credit = 'credit',
  debit = 'debit',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELED = 'CANCELED',
}

interface SaleProps {
  total: number
  paymentMethod: PaymentMethod
  status: PaymentStatus
  buyerId: string
  buyerName: string | null
  buyerEmail: string | null
  productId: string
  productName: string
  productPrice: number
  productQty: number
  createdAt: Date
}

export class Sale {
  private _id: string
  private props: SaleProps

  constructor(props: Replace<SaleProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }
  }

  public get id(): string {
    return this._id
  }

  public get total(): number {
    return this.props.total
  }

  public set total(total: number) {
    this.props.total = total
  }

  public get paymentMethod(): PaymentMethod {
    return this.props.paymentMethod
  }

  public set paymentMethod(paymentMethod: PaymentMethod) {
    this.props.paymentMethod = paymentMethod
  }

  public get status(): PaymentStatus {
    return this.props.status
  }

  public set status(status: PaymentStatus) {
    this.props.status = status
  }

  public get buyerId(): string {
    return this.props.buyerId
  }

  public set buyerId(buyerId: string) {
    this.props.buyerId = buyerId
  }

  public get buyerName(): string | null {
    return this.props.buyerName
  }

  public set buyerName(buyerName: string | null) {
    this.props.buyerName = buyerName
  }

  public get buyerEmail(): string | null {
    return this.props.buyerEmail
  }

  public set buyerEmail(buyerEmail: string | null) {
    this.props.buyerEmail = buyerEmail
  }

  public get productId(): string {
    return this.props.productId
  }

  public set productId(productId: string) {
    this.props.productId = productId
  }

  public get productName(): string {
    return this.props.productName
  }

  public set productName(productName: string) {
    this.props.productName = productName
  }

  public get productPrice(): number {
    return this.props.productPrice
  }

  public set productPrice(productPrice: number) {
    this.props.productPrice = productPrice
  }

  public get productQty(): number {
    return this.props.productQty
  }

  public set productQty(productQty: number) {
    this.props.productQty = productQty
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }
}

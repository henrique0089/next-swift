import { Replace } from '@helpers/replace'
import { randomUUID } from 'node:crypto'

export enum PaymentMethod {
  money = 'money',
  credit = 'credit',
  debit = 'debit',
}

interface SaleProps {
  total: number
  quantity: number
  paymentMethod: PaymentMethod
  productId: string
  buyerId: string
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

  public get quantity(): number {
    return this.props.quantity
  }

  public set quantity(quantity: number) {
    this.props.quantity = quantity
  }

  public get paymentMethod(): PaymentMethod {
    return this.props.paymentMethod
  }

  public set paymentMethod(paymentMethod: PaymentMethod) {
    this.props.paymentMethod = paymentMethod
  }

  public get productId(): string {
    return this.props.productId
  }

  public set productId(productId: string) {
    this.props.productId = productId
  }

  public get buyerId(): string {
    return this.props.buyerId
  }

  public set buyerId(buyerId: string) {
    this.props.buyerId = buyerId
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }
}

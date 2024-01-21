import { Replace } from '@helpers/replace'
import { randomUUID } from 'node:crypto'

interface ImageProps {
  url: string
  productId: string
  createdAt: Date
}

export class Image {
  private _id: string
  private props: ImageProps

  constructor(props: Replace<ImageProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }
  }

  public get id(): string {
    return this._id
  }

  public get url(): string {
    return this.props.url
  }

  public set url(url: string) {
    this.props.url = url
  }

  public get productId(): string {
    return this.props.productId
  }

  public set productId(productId: string) {
    this.props.productId = productId
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }
}

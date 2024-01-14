import { Replace } from '@helpers/replace'
import { randomUUID } from 'node:crypto'

interface CategoryProps {
  name: string
  createdAt: Date
}

export class Category {
  private _id: string
  private props: CategoryProps

  constructor(
    props: Replace<CategoryProps, { createdAt?: Date }>,
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

  public get createdAt(): Date {
    return this.props.createdAt
  }
}

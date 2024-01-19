import { Replace } from '@helpers/replace'
import { randomUUID } from 'node:crypto'
import { Category } from '../category'
import { Image } from './image'

export interface ProductProps {
  name: string
  description: string
  width: number
  height: number
  price: number
  quantity: number
  weight: number
  categories: Category[]
  images: Image[]
  createdAt: Date
  updatedAt?: Date | null
  removedAt?: Date | null
}

export class Product {
  private _id: string
  private props: ProductProps

  constructor(props: Replace<ProductProps, { createdAt?: Date }>, id?: string) {
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

  public get description(): string {
    return this.props.description
  }

  public set description(description: string) {
    this.props.description = description
  }

  public get width(): number {
    return this.props.width
  }

  public set width(width: number) {
    this.props.width = width
  }

  public get height(): number {
    return this.props.height
  }

  public set height(height: number) {
    this.props.height = height
  }

  public get price(): number {
    return this.props.price
  }

  public set price(price: number) {
    this.props.price = price
  }

  public get quantity(): number {
    return this.props.quantity
  }

  public set quantity(quantity: number) {
    this.props.quantity = quantity
  }

  public get weight(): number {
    return this.props.weight
  }

  public set weight(weight: number) {
    this.props.weight = weight
  }

  public get categories(): Category[] {
    return this.props.categories
  }

  public set categories(categories: Category[]) {
    this.props.categories = categories
  }

  public get images(): Image[] {
    return this.props.images
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }

  public get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  public get removedAt(): Date | null | undefined {
    return this.props.removedAt
  }

  public update() {
    this.props.updatedAt = new Date()
  }

  public remove() {
    this.props.removedAt = new Date()
  }
}

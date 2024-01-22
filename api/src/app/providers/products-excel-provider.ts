import { SavedMultipartFile } from '@fastify/multipart'

export interface ProductData {
  name: string
  description: string
  width: number
  height: number
  quantity: number
  price: number
  weight: number
}

export interface ProductsExcelProvider {
  load(file: SavedMultipartFile): Promise<ProductData[]>
}

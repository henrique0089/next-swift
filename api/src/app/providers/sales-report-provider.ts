import { Sale } from '@app/entities/sale'

export interface SalesReportData {
  filename: string
  fullFilePath: string
}

export interface SalesReportProvider {
  generateExcel(sales: Sale[]): Promise<SalesReportData>
}

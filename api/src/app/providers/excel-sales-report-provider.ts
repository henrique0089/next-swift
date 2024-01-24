import { Sale } from '@app/entities/sale'

export interface SalesReportData {
  filename: string
  fullFilePath: string
}

export interface ExcelSalesReportProvider {
  generate(sales: Sale[]): Promise<SalesReportData>
}

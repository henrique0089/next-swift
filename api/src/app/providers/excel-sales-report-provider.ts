import { Sale } from '@app/entities/sale'

export interface SalesReportData {
  filename: string
  fullFilePath: string
}

export interface RevenueParams {
  date: Date
  revenue: number
}

export interface ExcelSalesReportProvider {
  generate(sales: Sale[]): Promise<SalesReportData>
  generateRevenue(params: RevenueParams[]): Promise<SalesReportData>
}

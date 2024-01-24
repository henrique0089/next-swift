import { Sale } from '@app/entities/sale'

export interface PDFSalesReportProvider {
  generate(sales: Sale[]): Promise<Buffer>
}

import { Sale } from '@app/entities/sale'
import {
  SalesReportData,
  SalesReportProvider,
} from '@app/providers/sales-report-provider'
import { Workbook } from 'exceljs'
import { randomBytes } from 'node:crypto'
import { resolve } from 'node:path'

export class ExceljsSalesReportProvider implements SalesReportProvider {
  async generateExcel(sales: Sale[]): Promise<SalesReportData> {
    const workbook = new Workbook()
    const worksheet = workbook.addWorksheet('Vendas')

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Produto', key: 'productName', width: 30 },
      { header: 'Quantidade', key: 'productQuantity', width: 15 },
      { header: 'Preço', key: 'productPrice', width: 15 },
      { header: 'Total', key: 'total', width: 20 },
    ]

    for (const sale of sales) {
      worksheet.addRow({
        id: sale.id,
        productName: sale.productName,
        productQuantity: sale.productQty,
        productPrice: sale.productPrice,
        total: sale.total,
      })
    }

    const hash = randomBytes(6).toString('hex')
    const dir = resolve(__dirname, '..', '..', 'uploads', 'report')
    const filename = `${hash}.xlsx`
    const fullFilePath = `${dir}/${filename}`

    await workbook.xlsx.writeFile(fullFilePath, { filename })

    return {
      filename,
      fullFilePath,
    }
  }
}
